import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { StyleSheet, css } from "aphrodite-jss";
import Spin from "antd/es/spin";

const UniInfiniteList = ({
    dataList = [],
    renderComponent,
    showFetchMore,
    fetchMore,
}) => {
    const [isFetching, toggleIsFetching] = useState(false);
    const loader = useRef(null);
    const dataListRef = useRef(dataList);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0,
        };
        // initialize IntersectionObserver
        // and attaching to Load More div
        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
            observer.observe(loader.current);
        }
    }, []);

    useEffect(() => {
        dataListRef.current = dataList;
    }, [dataList]);

    const handleObserver = (entities) => {
        const target = entities[0];

        if (target.isIntersecting && !isFetching) {
            toggleIsFetching(true);
            if (fetchMore) {
                fetchMore(() => toggleIsFetching(false), dataListRef.current);
            }
        }
    };

    return (
        <div>
            {dataList.map((post, index) => renderComponent(post, index))}
            {showFetchMore && (
                <div className={css(styles.loading)} ref={loader}>
                    <Spin />
                </div>
            )}
        </div>
    );
};

export default UniInfiniteList;

const styles = StyleSheet.create({
    loading: {
        width: "fit-content",
        display: "flex",
        justifyContent: "center",
        padding: "20px 0px",
        margin: "0px auto",
    },
});
