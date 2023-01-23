import { Text } from "@paystackhq/pax";
import { json, redirect } from "@remix-run/node";

import {
  Link as RemixLink,
  Outlet,
  useActionData,
  useCatch,
  useLoaderData,
} from "@remix-run/react";
import type { ActionArgs } from "@remix-run/node";

import { styled } from "~/styles/stitches";

import styles from "~/styles/add-bank.css";
import AddBankDialog from "~/components/AddBankDialog";
import { ErrorContainer } from "~/components/ErrorContainer";

// route CSS file
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export type Bank = {
  id: number;
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string;
  pay_with_bank: boolean;
  active: boolean;
  country: string;
  currency: string;
  type: string;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
};

const List = styled("div", {
  marginTop: "5px",
});

const Link = styled(RemixLink, {
  textDecoration: "none",
  color: "$ceruleanBlue",
  fontWeight: "500",
});

const Container = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "space-around",
  padding: "30px 0",
});

export async function loader() {
  const apiUrl = "http://localhost:4000/banks";

  try {
    const res = await fetch(apiUrl);
    const banks: Bank[] = await res.json();

    const regex = /t/i;
    const filteredData = banks.filter((bank) => bank.name.match(regex));
    return json(filteredData);
  } catch (error) {
    throw error;
  }
}

export async function action({ request }: ActionArgs) {
  const apiUrl = "http://localhost:4000/banks";

  const formData = await request.formData();

  const name = formData.get("name");
  const slug = formData.get("slug");
  const id = formData.get("id");

  const errors = {
    name: name ? null : "Bank name is required",
    id: id ? null : "Bank id is required",
    slug: slug ? null : "Bank slug is required",
  };

  const hasError = Object.values(errors).filter((error) => !!error).length > 0;

  if (hasError) {
    return json(errors, { status: 400 });
  }

  const bankData = {
    name,
    slug,
    id,
  };

  await fetch(apiUrl, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bankData),
  });

  return redirect(`/banks/${bankData.id}`);
}

export default function BanksList() {
  const banks = useLoaderData<typeof loader>();
  const errors = useActionData<typeof action>();

  return (
    <Container>
      <div>
        <Text variant="heading1">Bank List</Text>

        {banks.map((bank) => (
          <List key={bank.id}>
            <ul>
              <li>
                <Text variant="body16Regular">
                  <Link to={`/banks/${bank.id}`}>{bank.name}</Link>
                </Text>
              </li>
            </ul>
          </List>
        ))}
        <AddBankDialog errors={errors} />
      </div>
      <div>
        <Outlet />
      </div>
    </Container>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <ErrorContainer>
      <h1>Caught Error</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </ErrorContainer>
  );
}
