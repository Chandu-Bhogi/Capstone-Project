import Modal from "antd/es/modal";
import { StyleSheet, css } from "aphrodite-jss";
import React from "react";
import PropTypes from "prop-types";
import UniText, { globalStyles } from "./UniText";

export const ModalHeader = ({ title, closeAction }) => {
    if (!title) {
        return null;
    }
    return (
        <div className={css(styles.modalHeader)}>
            <UniText size={18} weight="800">
                {title}
            </UniText>
            <div className={css(styles.closeButton)} onClick={closeAction}>
                <UniText size={24} weight="500" color="rgb(215,77,90,1)">
                &times;
                </UniText>
            </div>
        </div>
    );
};

const UniModal = ({
    headerText,
    children,
    containerStyle,
    onCancel,
    ...restProps
}) => (
    <Modal
        centered
        footer={null}
        width={560}
        maskStyle={{ backgroundColor: "rgba(0, 47, 52, 0.5)" }}
        className={css(styles.container, containerStyle)}
        onCancel={onCancel}
        closable={false}
        {...restProps}
    >
        <>
            <ModalHeader title={headerText} closeAction={onCancel} />
            {children}
        </>
    </Modal>
);

const styles = StyleSheet.create({
    container: {
        "& .ant-modal-content": {
            borderRadius: "5px",
        },
        "& .ant-modal-body": {
            //add required styles
            padding: "0px",
        },
        "& .ant-modal-header": {
            //add required styles
        },
        "& .ant-modal-title": {
            //add required styles
        },
        "& .ant-modal-footer": {
            //add required styles
        },
        "& .ant-modal-close-x": {
            //add required styles
        },
    },
    modalHeader: {
        backgroundColor: "#f5f8fa",
        // padding: "11px 14px 9px 20px", //modalHeader left padding 40
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderBottom: `1px solid ${globalStyles.borderGrey}`,
        position:"relative",
        height:48
    },
    closeButton: {
        position:"absolute",
        left:10,
        top:8,
        bottom:8,
        cursor: "pointer",
        width:32,
        height:32,
        backgroundColor:"rgb(215,77,90,0.15)",
        borderRadius:2,
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom:5
    },
});

UniModal.defaultProps = {
    visible: false,
};

UniModal.propTypes = {
    visible: PropTypes.bool,
};

export default UniModal;
