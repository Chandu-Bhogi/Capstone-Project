import { css, StyleSheet } from "aphrodite-jss";
import React from "react";
import UniText, { globalStyles } from "UniStyles/UniText";
import PropTypes from "prop-types";
import { Carousel } from "antd";

const UniDashboardCarousel = ({ dataSource, render }) => {
    return (
        <div className={css(styles.carouselContainer)}>
            <Carousel
                draggable={true}
                centerMode={true}
                touchThreshold={50}
                focusOnSelect={true}
                swipeToSlide={true}
                slidesToShow={dataSource.length < 3 ? dataSource.length : 3}
                className={css(styles.carousel)}
            >
                {dataSource.map((cardData, idx) => render(cardData))}
            </Carousel>
        </div>
    );
};

export default UniDashboardCarousel;

const styles = StyleSheet.create({
    carouselContainer: {
        boxShadow: "5px 5px 5px #e1e1e1",
        "& .ant-carousel .slick-slide": {
            textAlign: "center",
            height: "auto",
            lineHeight: "auto",
            backgroundColor: globalStyles.lightBlue,
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
        },
    },
    carousel: {
        backgroundColor: globalStyles.lightBlue,
        display: "flex",
        justifyContent: "center",
    },
});

// UniDashboardCarousel.defaultProps = {
//     dataSource: [], rows:[], uniqueCardKey:[]

// };

UniDashboardCarousel.propTypes = {
    dataSource: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    rows: PropTypes.array,
    uniqueCardKey: PropTypes.string,
};
