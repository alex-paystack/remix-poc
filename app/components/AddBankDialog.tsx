import { useState } from "react";
import { styled, Text } from "@paystackhq/pax";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Form } from "@remix-run/react";

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

export default function AddBank() {
  const [open, setOpen] = useState(false);

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
              <Label className="Label" htmlFor="name">
                Bank Name
              </Label>
              <input className="Input" id="name" name="name" />
            </fieldset>
            <fieldset className="Fieldset">
              <Label className="Label" htmlFor="slug">
                Bank Slug
              </Label>
              <input className="Input" id="slug" name="slug" />
            </fieldset>
            <Footer>
              <Button className="Button green" type="submit">
                Save changes
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

// export default function Todos() {
//   return (
//     <div>
//       <Form method="post">
//         <input type="text" name="title" />
//         <button type="submit">Create Todo</button>
//       </Form>
//     </div>
//   );
// }
