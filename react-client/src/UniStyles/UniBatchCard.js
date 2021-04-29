import { StyleSheet, css } from "aphrodite-jss";
import PropTypes from "prop-types";
import React from "react";
import Input from "antd/es/input";
import UniText, { globalStyles } from "./UniText";
import Button from "antd/es/button";
import { IoMdCreate, IoMdEye, IoMdSettings } from "react-icons/io";
import { GiTrashCan } from "react-icons/gi";
import UniTabRowBatchStr from "./UniTabRowBatchStr";
import UniTabRowTitle from "./UniTabRowTitle";
import UniTabRowDateList from "./UniTabRowDateList";
import UniTabRowMarks from "./UniTabRowMarks";
import UniTabRowButtons from "./UniTabRowButtons";
import dayjs from "dayjs";

const UniBatchCard = (props) => {
    const {
        // type,
        // label,
        // required,
        // style: inputStyle,
        // containerStyle,
        // ...restProps
    } = props;
    const DATE_FORMAT = "Do MMM";

    return (
        <div className={css(styles.divComponent)} key={props.test_id}>
            <div className={css(styles.divInfoCol)}>
                <div className={css(styles.colUpperRow)}>
                    <UniText size={16} weight={"700"}>
                        {props.batch_name}
                    </UniText>
                    <UniText size={12} weight={"300"}>
                        Created on -{" "}
                        {dayjs(props.creation_date).format(DATE_FORMAT)}
                    </UniText>
                </div>
                <div className={css(styles.colLowerRow)}>
                    <UniText size={14}>Students - {props.total_users}</UniText>
                </div>
            </div>
            <div className={css(styles.divButtonCol)}>{props.children}</div>
        </div>
    );
};

const styles = StyleSheet.create({
    divComponent: {
        width: "280px",
        height: "90px",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#F5F8FA",
        borderRadius: "5px",
        justifyContent: "space-between",
        border: "1px #CBD6E2 solid",
        padding: "10px 0px 10px 10px",
        margin: "10px 10px 10px 0px",
        marignTop: "10px",
        marginBottom: "10px",
        // flex: "1 1 20%",
        "&:hover": {
            transition: "opacity 3s ease-in-out",
            backgroundColor: "#F0F3F5",
        },
    },
    divInfoCol: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    colUpperRow: {
        display: "flex",
        flexDirection: "column",
    },
    divButtonCol: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    // componentCol: {
    //     display: "flex",
    //     flexDirection: "column",
    //     justifyContent: "flex-start",
    //     alignItems: "flex-start",
    //     flexWrap: "wrap",
    //     // width: "250px",
    //     flex: "1 1 25%",
    //     // flex: "0 0 20%",
    // },
    highLightElem: {
        display: "flex",
        flexDirection: "row",
    },
    container: {
        padding: "36px",
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

UniBatchCard.defaultProps = {
    // type: "input",
    // label: null,
    // required: false,
};

UniBatchCard.propTypes = {
    // type: PropTypes.oneOf(["input", "textarea", "password"]),
    // label: PropTypes.string,
    // required: PropTypes.bool,
};

export default UniBatchCard;
