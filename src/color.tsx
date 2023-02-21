import styled from "styled-components";

type PropsType = {
  info?: string;
};

type BadgeType = {
  color?: string;
};

function DefaultBadge({ info, color }: PropsType & BadgeType) {
  return (
    <>
      <Badge color={color}>{info}</Badge>
    </>
  );
}

DefaultBadge.defaultProps = {
  info: "날씨",
  color: "pink",
};

export default DefaultBadge;
const Badge = styled.span<BadgeType>`
  padding: 5px;
  margin: 10px;
  border-radius: 3px;
  background-color: ${(props) => props.color};
`;
