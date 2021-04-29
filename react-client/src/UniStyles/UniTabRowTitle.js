import { StyleSheet, css } from "aphrodite-jss";
import React from "react";
import UniText, { globalStyles } from "./UniText";

const UniTabRowTitle = (props) => {
    return (
        <div className={css(styles.titleComponent)}>
            <UniText size={16} containerStyle={styles.topText} weight={"700"}>
                {props.title}
            </UniText>
            {props.remarks && (
                <UniText size={12} weight={"600"} color={"#7B8793"}>
                    {props.remarks}
                </UniText>
            )}
            {props.enrollment_id && (
                <UniText size={12} weight={"600"} color={"#7B8793"}>
                    {props.enrollment_id}
                </UniText>
            )}
            {props.children}
        </div>
    );
};

const styles = StyleSheet.create({
    divComponent: {
        display: "flex",
        backgroundColor: "#F5F8FA",
        borderRadius: "5px",
        justifyContent: "space-between",
        border: "1px #F5F8FA solid",
        padding: "18px 21px 17px 28px",
        marignTop: "10px",
        marginBottom: "10px",
        // flex: "0 0 20%",
        "&:hover": {
            transition: "opacity 3s ease-in-out",
            backgroundColor: "#F0F3F5",
        },
    },
    titleComponent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexWrap: "wrap",
        // width: "250px",
        flex: "1 1 15%",
        padding: "0px 20px 0px 0px",
    },
    componentCol: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
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

UniTabRowTitle.defaultProps = {
    // type: "input",
    // label: null,
    // required: false,
};

UniTabRowTitle.propTypes = {
    // type: PropTypes.oneOf(["input", "textarea", "password"]),
    // label: PropTypes.string,
    // required: PropTypes.bool,
};

export default UniTabRowTitle;
