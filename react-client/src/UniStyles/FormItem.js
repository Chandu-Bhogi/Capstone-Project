import React from "react";
import Form from "antd/es/form";
import { css, StyleSheet } from "aphrodite-jss";

const FormItem = ({ children, ...rest }) => {
    return (
        <div className={css(styles.container)}>
            <Form.Item {...rest}>{children}</Form.Item>
        </div>
    );
};

export default FormItem;

const styles = StyleSheet.create({
    container: {
        "& .ant-form-item": {
            margin: 0,
        },
        "& .ant-form-item-label": {
            padding: 0,
        },
    },
});
