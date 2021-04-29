import { StyleSheet, css } from "aphrodite-jss";
import PropTypes from "prop-types";
import React from "react";
import Input from "antd/es/input";
import UniText, { globalStyles } from "./UniText";
import Button from "antd/es/button";
import { IoMdCreate, IoMdEye, IoMdSettings } from "react-icons/io";
import { GiTrashCan } from "react-icons/gi";

const UniTabRowAttendance = (props) => {
    const {
        // type,
        // label,
        // required,
        // style: inputStyle,
        // containerStyle,
        // ...restProps
    } = props;

    return (
        <React.Fragment>
            {/* MARKS */}
            <div className={css(props.style)}>
                <div className={css(styles.highLightElem)}>
                    <UniText
                        size={14}
                        containerStyle={styles.topText}
                        display="block"
                        weight={"700"}
                    >
                        {Math.round(
                            (props.total_attempts / props.individualsCount) *
                                100
                        )}
                        %
                    </UniText>
                </div>
                <div className={css(styles.highLightElem)}>
                    <UniText size={12} color={globalStyles.darkGrey}>
                        {props.total_attempts}
                    </UniText>
                    &nbsp;
                    <UniText size={12} color={globalStyles.darkGrey}>
                        attempted out of {props.individualsCount}
                    </UniText>
                </div>
            </div>
        </React.Fragment>
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
    componentCol: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexWrap: "wrap",
        // width: "250px",
        flex: "1 1 15%",
        padding: "0px 20px 0px 0px",

        // flex: "0 0 20%",
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

UniTabRowAttendance.defaultProps = {
    // type: "input",
    // label: null,
    // required: false,
};

UniTabRowAttendance.propTypes = {
    // type: PropTypes.oneOf(["input", "textarea", "password"]),
    // label: PropTypes.string,
    // required: PropTypes.bool,
};

export default UniTabRowAttendance;
