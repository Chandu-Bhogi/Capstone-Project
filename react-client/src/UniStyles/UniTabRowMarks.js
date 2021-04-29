import { StyleSheet, css } from "aphrodite-jss";
import React from "react";
import UniText, { globalStyles } from "./UniText";

const UniTabRowMarks = (props) => {
    return (
        <React.Fragment>
            <div className={css(props.style)}>
                {!props.hideDuration ? (
                    <div className={css(styles.highLightElem)}>
                        <UniText
                            size={14}
                            containerStyle={styles.topText}
                            display="block"
                        >
                            Marks -&nbsp;
                        </UniText>
                        <UniText> {props.total_points}</UniText>
                    </div>
                ) : (
                    <span className={css(styles.grayMark)}>
                        <UniText size={12} weight="600">
                            {props.total_points} marks
                        </UniText>
                    </span>
                )}
                {!props.hideDuration && (
                    <div className={css(styles.highLightElem)}>
                        <UniText size={14}>
                            Duration -&nbsp;
                            {props.duration
                                ? `${props.duration}${" "}mins`
                                : null}{" "}
                        </UniText>
                    </div>
                )}
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
    grayMark: {
        padding: "5px 12px",
        // color: globalStyles.blue,
        backgroundColor: "#307DD0" + globalStyles.transparency,
        borderRadius: "4px",
        marginRight: "24px",
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

UniTabRowMarks.defaultProps = {
    // type: "input",
    // label: null,
    // required: false,
};

UniTabRowMarks.propTypes = {
    // type: PropTypes.oneOf(["input", "textarea", "password"]),
    // label: PropTypes.string,
    // required: PropTypes.bool,
};

export default UniTabRowMarks;
