import { StyleSheet, css } from "aphrodite-jss";
import PropTypes from "prop-types";
import React from "react";
import Input from "antd/es/input";
import UniText, { globalStyles } from "./UniText";
import Button from "antd/es/button";
import { IoMdCreate, IoMdEye, IoMdSettings } from "react-icons/io";
import { GiTrashCan } from "react-icons/gi";
import dayjs from "dayjs";
import { isTestScheduled } from "../utils";

const DATE_FORMAT = "DD MMM YYYY . hh:mm A";

const UniTabRowDateList = (props) => {
    return (
        <React.Fragment>
            <div className={css(props.style)}>
                {isTestScheduled(props.start_date, props.end_date) ? (
                    <UniText size={14}>Yet to Schedule</UniText>
                ) : (
                    <div className={css(styles.highLightElem)}>
                        <div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <UniText
                                    size={12}
                                    display="block"
                                    color={globalStyles.darkGrey}
                                >
                                    Start -
                                </UniText>
                                <UniText size={14} weight={"600"}>
                                    &nbsp;
                                    {dayjs(props.start_date).format(
                                        DATE_FORMAT
                                    )}
                                </UniText>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginTop: 5,
                                }}
                            >
                                <UniText
                                    size={12}
                                    display="block"
                                    color={globalStyles.darkGrey}
                                >
                                    End -
                                </UniText>
                                <UniText size={14} weight={"600"}>
                                    &nbsp;
                                    {dayjs(props.end_date).format(DATE_FORMAT)}
                                </UniText>
                            </div>
                        </div>
                        {props.individualCard && (
                            <UniText
                                size={12}
                                weight="600"
                                color={globalStyles.darkGrey}
                            >
                                Time taken -{" "}
                                {dayjs(props.end_date).diff(
                                    dayjs(props.start_date),
                                    "minute"
                                )}{" "}
                                minutes
                            </UniText>
                        )}
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    highLightElem: {
        display: "flex",
        flexDirection: "column",
    },
    container: {
        padding: "36px",
        borderRadius: "10px 10px 0px 0px",
    },
    buttonContainer: {
        margin: "0 0 0 0",
        display: "flex",
        justifyContent: "space-between",
    },
    searchInput: {
        width: "400px",
    },
    rowButtonsContainer: {
        width: "200px",
        display: "flex",
        flexWrap: "wrap",
    },
    deleteIcon: {
        marginTop: -5,
    },
    viewButton: {
        width: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: 0,
        color: globalStyles.blue,
        backgroundColor: globalStyles.blue + globalStyles.transparency,
        marginRight: 10,
    },
    editButton: {
        width: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: 0,
        backgroundColor: globalStyles.blue + globalStyles.transparency,
        color: globalStyles.blue,
        marginRight: 10,
    },
    changeSettingsButton: {
        width: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: 0,
        backgroundColor: globalStyles.secondary + globalStyles.transparency,
        color: globalStyles.secondary,
        marginRight: 10,
    },
    deleteButton: {
        width: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: 0,
        backgroundColor: globalStyles.errorRed + globalStyles.transparency,
        color: globalStyles.errorRed,
        marginRight: 10,
    },
    topText: {
        marginBottom: 3,
    },
    emptyContainer: {
        marginTop: 120,
    },
    emptyText: {
        marginTop: 20,
        marginBottom: 120,
    },
});

UniTabRowDateList.defaultProps = {
    // type: "input",
    // label: null,
    // required: false,
};

UniTabRowDateList.propTypes = {
    // type: PropTypes.oneOf(["input", "textarea", "password"]),
    // label: PropTypes.string,
    // required: PropTypes.bool,
};

export default UniTabRowDateList;
