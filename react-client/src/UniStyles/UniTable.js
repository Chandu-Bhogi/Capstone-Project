import { css, StyleSheet } from "aphrodite-jss";
import React from "react";
import UniText, { globalStyles } from "./UniText";
import PropTypes from "prop-types";

const UniTable = ({ dataSource, columns, uniqueRowKey }) => {
    const createTableHeader = (columns) => {
        return (
            <div className={css(styles.headerRow)}>
                {columns.map((col, index) => {
                    const headerCellStyles = StyleSheet.create({
                        headerCell: {
                            padding: "10px 0px",
                        },
                        flex1: {
                            flex: "1 1 0",
                        },
                        customWidth: {
                            width: col.width || "auto",
                        },
                    });

                    return (
                        <div
                            key={`${col.key}${index}`}
                            className={css(
                                headerCellStyles.headerCell,
                                col.width
                                    ? headerCellStyles.customWidth
                                    : headerCellStyles.flex1
                            )}
                        >
                            <UniText size={16} weight="700">
                                {col.title ? col.title.toUpperCase() : null}
                            </UniText>
                        </div>
                    );
                })}
            </div>
        );
    };

    const createTableRow = (rowData, columns, rowIdx) => {
        return (
            <div key={rowData[uniqueRowKey]} className={css(styles.tableRow)}>
                {columns.map((col) => {
                    const rowCellStyles = StyleSheet.create({
                        flex1: {
                            flex: "1 1 0",
                        },
                        customWidth: {
                            width: col.width || "auto",
                        },
                    });
                    return (
                        <div
                            key={`${col.key}${rowData[uniqueRowKey]}`}
                            className={css(
                                col.width
                                    ? rowCellStyles.customWidth
                                    : rowCellStyles.flex1
                            )}
                        >
                            {/* If there is a render method in the column */}
                            {col.render ? (
                                // If the dataIndex (which is responsible to fetch data from dataSource) is an Array
                                Array.isArray(col.dataIndex) ? (
                                    //render method returns the index and each element of dataSource
                                    // prettier-ignore
                                    col.render(col.dataIndex.map((dIndex) => rowData[dIndex]), rowData, rowIdx)
                                ) : (
                                    // If the dataIndex is a string
                                    col.render(rowData[col.dataIndex])
                                )
                            ) : (
                                // If render method is not provided
                                // prettier-ignore
                                <div style={{display: "flex", flexDirection: "column"}}
                                >
                                    {/* If the dataIndex is an array */}
                                    {Array.isArray(col.dataIndex)
                                        ? col.dataIndex.map((dIndex) => {
                                              return (
                                                  <UniText
                                                      size={13}
                                                      weight="700"
                                                      key={dIndex}
                                                  >
                                                      {rowData[dIndex]}
                                                  </UniText>
                                              );
                                          })
                                        : //   If no render method and dataIndex is string
                                          rowData[col.dataIndex]}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div>
            {createTableHeader(columns)}
            <div className={css(styles.scrollable)}>
                {/* <UniInfiniteList
                    dataList={dataSource}
                    renderComponent={(rowData) =>
                        createTableRow(rowData, columns)
                    }
                    fetchMore={}
                    showFetchMore={}
                /> */}
                {dataSource.map((rowData, idx) =>
                    createTableRow(rowData, columns, idx)
                )}
            </div>
        </div>
    );
};

export default UniTable;

const styles = StyleSheet.create({
    headerRow: {
        display: "flex",
        padding: "10px 20px 6px 20px",
        margin: "0px -20px 1px -21px",
        // boxShadow: "0px 2px 2px -2px rgba(0,0,0,0.25)",
        borderBottom: `1px ${globalStyles.borderGrey} solid`,
    },
    tableRow: {
        display: "flex",
        padding: "15px 20px",
        margin: "10px 0px",
        backgroundColor: globalStyles.lightBlue,
        border: `1px ${globalStyles.borderGrey} solid`,
        borderRadius: 5,
    },
    scrollable: {
        height: "calc(100vh - 217px)",
        overflowY: "auto",
        paddingTop: 8,
    },
});

// UniTable.defaultProps = {
//     dataSource: [], columns:[], uniqueRowKey:[]

// };

UniTable.propTypes = {
    dataSource: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    columns: PropTypes.array,
    uniqueRowKey: PropTypes.string,
};
