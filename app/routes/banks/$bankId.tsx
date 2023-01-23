import { Text } from "@paystackhq/pax";
import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";

import { useCatch, useLoaderData, useRouteLoaderData } from "@remix-run/react";
import type { Bank } from "../banks";
import { ErrorContainer } from "~/components/ErrorContainer";

export async function loader({ params }: LoaderArgs) {
  const bankId = params.bankId;
  return json({ bankId });
}

export default function SingleBank() {
  const { bankId } = useLoaderData<typeof loader>();

  // access data from another route that is still loaded
  const banks = useRouteLoaderData("routes/banks");

  const bank = (banks as Bank[]).find(
    (bank) => Number(bank.id) === Number(bankId)
  );

  if (!bank) {
    throw new Error("Bank not found");
  }

  return (
    <div>
      <pre>
        <code>{JSON.stringify(bank, null, 2)}</code>
      </pre>
    </div>
  );
}

// Local catch boundary
export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
      <h1>Caught Error</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}

// Local error boundary
export function ErrorBoundary({
  error,
}: {
  error: { message?: string; stack?: string };
}) {
  return (
    <ErrorContainer>
      <Text variant="heading1">Error</Text>
      <Text variant="body14Regular" style={{ display: "block" }}>
        Message: {error.message}
      </Text>
      <pre>{error.stack}</pre>
    </ErrorContainer>
  );
}
