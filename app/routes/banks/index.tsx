import { Text } from "@paystackhq/pax";
import { ActionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { styled } from "~/styles/stitches";

import styles from "~/styles/add-bank.css";
import AddBankDialog from "~/components/AddBankDialog";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

type Bank = {
  name: string;
  id: string;
};

const List = styled("div", {
  marginTop: "5px",
});

export async function loader() {
  const apiUrl = "http://api.paystack.co/bank";
  const res = await fetch(apiUrl);

  const data: { status: boolean; message: string; data: Bank[] } =
    await res.json();

  const regex = /j/i;
  const filteredData = {
    ...data,
    data: data.data.filter((bank) => bank.name.match(regex)),
  };
  return json(filteredData);
}

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  console.log(body);
  // const todo = await fakeCreateTodo({
  //   title: body.get("title"),
  // });
  // return redirect(`/todos/${todo.id}`);
  return redirect("/");
}

export default function BanksList() {
  const { data } = useLoaderData<typeof loader>();
  return (
    <div>
      <Text variant="heading1">Bank List</Text>

      {data.map((bank) => (
        <List key={bank.id}>
          <ul>
            <li>
              <Text variant="body16Regular">{bank.name}</Text>
            </li>
          </ul>
        </List>
      ))}

      <AddBankDialog />
    </div>
  );
}
