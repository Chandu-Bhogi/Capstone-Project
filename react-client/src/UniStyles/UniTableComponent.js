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
import { isTestScheduled as getIsTestScheduled } from "../utils";

const UniTableComponent = (props) => {
    const isTestScheduled = getIsTestScheduled(
        props.elem.start_date,
        props.elem.end_date
    );
    return (
        <div className={css(styles.divComponent)} key={props.test_id}>
            <UniTabRowTitle
                title={props.elem.title}
                remarks={props.elem.remarks}
                style={styles.componentCol}
            />
            <UniTabRowBatchStr
                batchStr={props.batchStr}
                // individualsCount={props.individualsCount}
                style={styles.componentColWide}
            />
            <UniTabRowDateList
                start_date={props.elem.start_date}
                end_date={props.elem.end_date}
                style={styles.componentColWide}
            />
            <UniTabRowMarks
                total_points={props.elem.total_points}
                duration={props.elem.duration}
                test={props.test}
                style={styles.componentCol}
            />
            <UniTabRowButtons
                isTestScheduled={isTestScheduled}
                isTestActive={props.isTestActive}
                test_id={props.elem.test_id}
                idx={props.idx}
                elem={props.elem}
                deleteTest={props.deleteTest}
                style={styles.componentColNarrow}
                duplicateTest={props.duplicateTest}
            />
        </div>
    );
};

const styles = StyleSheet.create({
    divComponent: {
        display: "flex",
        backgroundColor: "#F5F8FA",
        borderRadius: "5px",
        justifyContent: "space-between",
        border: "1px #CBD6E2 solid",
        padding: "14px 20px 14px 20px",
        marignTop: "10px",
        marginBottom: "10px",
        // flex: "1 1 20%",
        "&:hover": {
            transition: "opacity 3s ease-in-out",
            backgroundColor: "#F0F3F5",
        },
    },
    componentCol: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "wrap",
        // width: "250px",
        flex: "1 1 20%",
        padding: "0px 20px 0px 0px",
    },
    componentColWide: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "wrap",
        // width: "250px",
        flex: "1 1 25%",
        padding: "0px 20px 0px 0px",
    },
    componentColNarrow: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "wrap",
        // width: "250px",
        flex: "1 1 15%",
        padding: "0px 20px 0px 0px",
    },
    highLightElem: {
        display: "flex",
        flexDirection: "row",
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

UniTableComponent.defaultProps = {
    // type: "input",
    // label: null,
    // required: false,
};

UniTableComponent.propTypes = {
    // type: PropTypes.oneOf(["input", "textarea", "password"]),
    // label: PropTypes.string,
    // required: PropTypes.bool,
};

export default UniTableComponent;
