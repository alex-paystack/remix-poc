import { Link as RemixLink } from "@remix-run/react";
import { Text } from "@paystackhq/pax";

import { styled } from "../styles/stitches";

const Container = styled("div", {});

const Link = styled(RemixLink, {
  textDecoration: "none",
  color: "$ceruleanBlue",
  fontWeight: '500'
});

export default function Index() {
  return (
    <Container>
      <Text variant="heading1">Welcome to Remix with Pax</Text>
      <ul>
        <li>
          <Text variant="body16Regular">
            <Link to="/banks">Banks</Link>
          </Text>
        </li>
      </ul>
    </Container>
  );
}
