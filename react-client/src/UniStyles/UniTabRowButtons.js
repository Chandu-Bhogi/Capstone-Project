import { StyleSheet, css } from "aphrodite-jss";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import Input from "antd/es/input";
import UniText, { globalStyles } from "./UniText";
import Button from "antd/es/button";
import { IoMdCreate, IoMdEye, IoMdSettings } from "react-icons/io";
import { FaCopy } from "react-icons/fa";
import { GiTrashCan } from "react-icons/gi";
import UniModal from "UniStyles/UniModal";
import CreateTest from "screens/Modals/CreateTestOrGroup";
import { useHistory } from "react-router-dom";
import TestSettings from "screens/Modals/TestSettings";
import axios from "Utils/axios";
import Modal from "antd/es/modal";

const UniTabRowButtons = (props) => {
    const {
        // type,
        // label,
        // required,
        // style: inputStyle,
        // containerStyle,
        // ...restProps
    } = props;

    const [showModal, toggleModal] = useState(false);
    const [showSettingsModal, toggleModalType] = useState(false);
    const [listOfTests, setListOfTests] = useState([]);

    const history = useHistory();

    const deleteTest = (testId) => {
        axios.delete(`/tests/${testId}`).then((res) => {
            let newListOfTests = listOfTests;
            newListOfTests = listOfTests.filter((el) => el.test_id !== testId);
            setListOfTests(newListOfTests);
        });
    };
    return (
        <React.Fragment>
            <div className={css(props.style)}>
                {/* BUTTONS */}
                <div className={css(styles.rowButtonsContainer)}>
                    {props.isTestActive ? (
                        <Button
                            onClick={() =>
                                history.push(
                                    `/admin/test/preview/${props.test_id}`
                                )
                            }
                            className={css(styles.viewButton)}
                            title="View Paper"
                            icon={<IoMdEye size={21} />}
                        />
                    ) : (
                        <Button
                            onClick={() =>
                                history.push(`/admin/test/${props.test_id}`)
                            }
                            className={css(styles.editButton)}
                            title="Edit"
                            icon={<IoMdCreate size={20} />}
                        />
                    )}
                    <Button
                        onClick={() => props.duplicateTest(props.test_id)}
                        className={css(styles.copyButton)}
                        title="Copy Paper"
                        icon={<FaCopy size={21} />}
                    />
                    {!props.isTestScheduled && (
                        <Button
                            onClick={() => {
                                toggleModalType({
                                    ...props.elem,
                                    parentIndex: props.idx,
                                });
                                toggleModal(true);
                            }}
                            // disabled={props.isTestScheduled}
                            className={css(styles.changeSettingsButton)}
                            title="Settings"
                            icon={<IoMdSettings size={24} />}
                        />
                    )}

                    {!props.isTestActive && (
                        <Button
                            onClick={() => {
                                Modal.confirm({
                                    content: <UniText>Are you sure?</UniText>,
                                    okText: "Yes",
                                    onOk() {
                                        props.deleteTest(props.test_id);
                                    },
                                    onCancel() {
                                        console.log("Cancel");
                                    },
                                });
                            }}
                            className={css(styles.deleteButton)}
                            title="Delete"
                            // disabled={props.isTestActive}
                            icon={
                                <GiTrashCan
                                    className={css(styles.deleteIcon)}
                                    size={25}
                                />
                            }
                        />
                    )}
                </div>
                <UniModal
                    visible={showModal}
                    width={showSettingsModal ? 720 : 480}
                    onCancel={() => toggleModal(false)}
                    destroyOnClose
                    headerText={
                        showSettingsModal
                            ? "Update Test Details"
                            : "Create New Test"
                    }
                >
                    {showSettingsModal ? (
                        <TestSettings
                            onClose={() => toggleModal(false)}
                            testId={showSettingsModal.test_id}
                            testDetails={showSettingsModal}
                            updateTestDetails={(payload) => {
                                let newList = [...listOfTests];
                                newList[payload.parentIndex] = {
                                    ...newList[payload.parentIndex],
                                    ...payload,
                                };
                                setListOfTests(newList);
                            }}
                        />
                    ) : (
                        <CreateTest closeModal={() => toggleModal(false)} />
                    )}
                </UniModal>
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
        flex: "1 1 20%",
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
        display: "flex",
        flexWrap: "wrap",
    },
    deleteIcon: {
        marginTop: -5,
    },
    copyButton: {
        width: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: 0,
        color: globalStyles.primary,
        backgroundColor: globalStyles.primary + globalStyles.transparency,
        marginRight: 10,
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

UniTabRowButtons.defaultProps = {
    // type: "input",
    // label: null,
    // required: false,
};

UniTabRowButtons.propTypes = {
    // type: PropTypes.oneOf(["input", "textarea", "password"]),
    // label: PropTypes.string,
    // required: PropTypes.bool,
};

export default UniTabRowButtons;
