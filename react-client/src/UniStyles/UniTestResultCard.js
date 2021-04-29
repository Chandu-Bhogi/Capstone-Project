import { StyleSheet, css } from "aphrodite-jss";
import React from "react";
import UniText, { globalStyles } from "./UniText";
import Button from "antd/es/button";
import { IoMdEye } from "react-icons/io";
import UniTabRowTitle from "./UniTabRowTitle";
import UniTabRowDateList from "./UniTabRowDateList";
import UniTabRowMarks from "./UniTabRowMarks";
import { useHistory } from "react-router-dom";

const UniTestResultCard = (props) => {
    const history = useHistory();

    return (
        <div className={css(styles.divComponent)} key={props.test_id}>
            <UniTabRowTitle
                title={props.first_name}
                style={styles.dateCol}
                enrollment_id={props.enrollment_id}
            />
            <UniTabRowDateList
                start_date={props.start_date}
                end_date={props.end_date}
                style={styles.dateCol}
                individualCard={true}
            />
            <div className={css(styles.componentCol)}>
                <span
                    className={
                        props.is_submitted
                            ? css(styles.greenMark)
                            : css(styles.redMark)
                    }
                >
                    <UniText size={12} weight={"700"}>
                        {props.is_submitted ? "SUBMITTED" : "NOT SUBMITTED"}
                    </UniText>
                </span>
            </div>
            <UniTabRowMarks
                total_points={props.correct_points}
                duration={props.duration}
                style={styles.componentCol}
                hideDuration
            />
            <div className={css(styles.rankCol)}>
                <UniText size={14} weight={"700"}>
                    {props.index + 1}
                </UniText>
            </div>
            <div className={css(styles.buttonContainer)}>
                <Button
                    title="View"
                    onClick={() =>
                        history.push(`/admin/results/paper/${props.attempt_id}`)
                    }
                    className={css(styles.viewButton)}
                    icon={<IoMdEye size={20} />}
                />
            </div>
        </div>
    );
};

const styles = StyleSheet.create({
    divComponent: {
        display: "flex",
        backgroundColor: "#F5F8FA",
        borderRadius: "5px",
        justifyContent: "space-between",
        alignItems: "center",
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
    greenMark: {
        padding: "5px 12px",
        backgroundColor: "rgba(51, 216, 37, 0.12)",
        color: "#33d825",
        borderRadius: "4px",
        marginRight: "24px",
    },
    redMark: {
        padding: "5px 9px",
        textAlign: "center",
        backgroundColor: "rgba(215, 77, 90, 0.26)",
        color: "#d74d5a",
        borderRadius: "4px",
        marginRight: "24px",
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "wrap",
        // width: "250px",
        flex: "1 1 5%",
        padding: "0px 20px 0px 0px",
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
    dateCol: {
        flex: "1 1 30%",
    },
    rankCol: {
        flex: "1 1 10%",
    },
    componentColRank: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexWrap: "wrap",
        // width: "250px",
        flex: "1 1 10%",
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
    // buttonContainer: {
    //     margin: "0 0 0 0",
    //     display: "flex",
    //     justifyContent: "space-between",
    // },
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

UniTestResultCard.defaultProps = {
    // type: "input",
    // label: null,
    // required: false,
};

UniTestResultCard.propTypes = {
    // type: PropTypes.oneOf(["input", "textarea", "password"]),
    // label: PropTypes.string,
    // required: PropTypes.bool,
};

export default UniTestResultCard;
