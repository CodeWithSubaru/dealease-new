import { List, FlexboxGrid, Container } from "rsuite";

import UserCircleIcon from "@rsuite/icons/legacy/UserCircleO";

export function CustomList(props) {
  const renderRaise = (number) => {
    const isPositive = number > 0;
    const isNegative = number < 0;
    return (
      <span style={{ paddingLeft: 15, color: isNegative ? "red" : "green" }}>
        <span>{isPositive ? "+" : null}</span>
        <span>{number}</span>
      </span>
    );
  };

  const styleCenter = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60px",
  };

  const slimText = {
    fontSize: "0.666em",
    color: "#97969B",
    fontWeight: "lighter",
    paddingBottom: 5,
  };

  const titleStyle = {
    paddingBottom: 5,
    whiteSpace: "nowrap",
    fontWeight: 500,
  };

  const dataStyle = {
    fontSize: "1.2em",
    fontWeight: 500,
  };

  return (
    <>
      <Container className="bg-white shadow m-4 border-top border-bottom border-start border-end border-1 border-black-subtle overflow-hidden rounded">
        <List hover>
          <FlexboxGrid className="rounded ">
            <h6 className="p-4">{props.title}</h6>
          </FlexboxGrid>
          {props.data.length > 0 ? (
            props.data.map((item, index) => (
              <List.Item
                key={item["title"]}
                index={index + 1}
                className="p-3 border-bottom border-start border-end border-1 border-black-subtle"
              >
                <FlexboxGrid>
                  {/*base info*/}
                  <FlexboxGrid.Item
                    colspan={12}
                    style={{
                      ...styleCenter,
                      flexDirection: "column",
                      alignItems: "flex-start",
                      overflow: "hidden",
                      flexGrow: 1,
                    }}
                  >
                    <div style={titleStyle}>{item["title"]}</div>
                    <div style={slimText}>
                      <div>
                        <UserCircleIcon />
                        {" " + item["creator"]}
                      </div>
                      <div>{item["date"]}</div>
                    </div>
                  </FlexboxGrid.Item>

                  <FlexboxGrid.Item style={styleCenter}>
                    <div style={{ textAlign: "right" }}>
                      <div style={slimText}>Shells</div>
                      <div style={dataStyle}>
                        {item["peak"].toLocaleString()}
                      </div>
                    </div>
                  </FlexboxGrid.Item>
                </FlexboxGrid>
              </List.Item>
            ))
          ) : (
            <List.Item className="p-3 border-bottom border-start border-end border-1 border-black-subtle">
              <FlexboxGrid className="justify-content-center">
                <FlexboxGrid.Item>
                  <div
                    className="p-2"
                    style={{ textAlign: "center", flexGrow: 1 }}
                  >
                    <div>No Data</div>
                    <div></div>
                  </div>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </List.Item>
          )}
        </List>
      </Container>
    </>
  );
}
