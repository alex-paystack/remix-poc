import { useState } from "react";
import { styled, Text } from "@paystackhq/pax";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Form, useNavigation } from "@remix-run/react";

const Footer = styled("div", {
  fontFamily: "graphik",
  display: "flex",
  marginTop: 25,
  justifyContent: "flex-end",
});

const Label = styled("label", {
  fontFamily: "graphik",
});

const Button = styled("button", {
  fontFamily: "graphik",
  cursor: "pointer",
});

const Error = styled("div", {
  fontFamily: "graphik",
  color: "#D44141",
  fontSize: "12px",
});

type AddBankProps = {
  errors?: {
    name: string | null;
    id: string | null;
    slug: string | null;
  };
};

export default function AddBank({ errors }: AddBankProps) {
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button className="Button violet">Add Bank</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">
            <Text variant="heading3">Add Bank</Text>
          </Dialog.Title>
          <Dialog.Description className="DialogDescription">
            <Text>
              Add a new bank to the banks list. Click save when you're done.
            </Text>
          </Dialog.Description>
          <Form method="post">
            <fieldset className="Fieldset">
              <Label className="Label" htmlFor="id">
                Bank ID
              </Label>
              <input className="Input" id="id" name="id" />
              {errors?.id && <Error>{errors.id}</Error>}
            </fieldset>
            <fieldset className="Fieldset">
              <Label className="Label" htmlFor="name">
                Bank Name
              </Label>
              <input className="Input" id="name" name="name" />
              {errors?.name && <Error>{errors.name}</Error>}
            </fieldset>
            <fieldset className="Fieldset">
              <Label className="Label" htmlFor="slug">
                Bank Slug
              </Label>
              <input className="Input" id="slug" name="slug" />
              {errors?.slug && <Error>{errors.slug}</Error>}
            </fieldset>
            <Footer>
              <Button className="Button green" type="submit">
                {isSubmitting ? "Saving..." : "Save changes"}
              </Button>
            </Footer>
          </Form>
          <Dialog.Close asChild>
            <Button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
