import { css, StyleSheet } from "aphrodite-jss";
import React from "react";
import UniText, { globalStyles } from "UniStyles/UniText";
import PropTypes from "prop-types";

const UniDashboardCard = ({ cardData, rows, buttons, uniqueCardKey }) => {
    const createCard = (cardData, rows, buttons, uniqueCardKey) => {
        return (
            <div
                key={cardData[uniqueCardKey]}
                // style={{ display: "flex !important" }}
                className={css(styles.cardContainer)}
            >
                <div className={css(styles.infoContainer)}>
                    {rows.map((row) => {
                        return (
                            <div key={`${row.key}${cardData[uniqueCardKey]}`}>
                                {/* If there is a render method in the rowumn */}
                                {row.render ? (
                                    // If the dataIndex (which is responsible to fetch data from dataSource) is an Array
                                    Array.isArray(row.dataIndex) ? (
                                        //render method returns the index and each element of dataSource
                                        // prettier-ignore
                                        row.render(row.dataIndex.map((dIndex) => cardData[dIndex]))
                                    ) : (
                                        // If the dataIndex is a string
                                        row.render(cardData[row.dataIndex])
                                    )
                                ) : (
                                    // If render method is not provided
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                        }}
                                    >
                                        {/* If the dataIndex is an array */}
                                        {Array.isArray(row.dataIndex)
                                            ? row.dataIndex.map((dIndex) => {
                                                  return (
                                                      <UniText
                                                          size={13}
                                                          weight="700"
                                                          key={dIndex}
                                                      >
                                                          {cardData[dIndex]}
                                                      </UniText>
                                                  );
                                              })
                                            : //   If no render method and dataIndex is string
                                              cardData[row.dataIndex]}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className={css(styles.buttonContainer)}>
                    {buttons &&
                        buttons.map((button) => {
                            return (
                                <div
                                    key={`${button.key}${cardData[uniqueCardKey]}`}
                                >
                                    {button.render &&
                                        (Array.isArray(button.dataIndex)
                                            ? //prettier-ignore
                                              button.render(button.dataIndex.map((dIndex) => cardData[dIndex]))
                                            : //prettier-ignore
                                              button.render(cardData[row.dataIndex]))}
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    };

    return createCard(cardData, rows, buttons);
};

export default UniDashboardCard;

const styles = StyleSheet.create({
    cardContainer: {
        display: "flex !important",
        width: "400px !important",
        height: "200px",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
        // padding: "15px 20px",
        // margin: "10px 0px",
        backgroundColor: "#FFFFFF",
        border: `1px ${globalStyles.borderGrey} solid`,
        borderRadius: 5,
    },
    buttonContainer: {},
    infoContainer: {
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
    },
});

// UniDashboardCard.defaultProps = {
//     dataSource: [], rows:[], uniqueCardKey:[]

// };

UniDashboardCard.propTypes = {
    dataSource: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    rows: PropTypes.array,
    uniqueCardKey: PropTypes.string,
};
