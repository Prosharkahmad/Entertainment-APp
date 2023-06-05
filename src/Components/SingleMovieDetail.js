import { Row, Col, Card, Button, Modal, Space, Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Components/SingleMovieDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { productList } from "../ReduxSaga/actions/productAction";
import ReactPlayer from "react-player";
import {
  FacebookFilled,
  TwitterOutlined,
  InstagramOutlined,
  ArrowRightOutlined,
  StarFilled,
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";

export function SingleMovieDetail() {
  let genreId = useSelector((state) => state.MoviesGenreReducer.data.genres);
  const castCrew = useSelector((state) => state.SagaReducer.castCrew);
  const budgetRevenue = useSelector((state) => state.SagaReducer.budgetRevenue);
  const keywordsData = useSelector((state) => state.SagaReducer.keywordsData);
  const reviewsData = useSelector((state) => state.SagaReducer.reviewsData);

  let [keywordss] = keywordsData;
  let [reviews] = reviewsData;

  const [video, setVideo] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  let [index, setIndex] = useState(0);
  const [mediaItem, setMediaItem] = useState([reviews.results[0]]); // <-- seed initial state
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const timerId = setInterval(
      () => setIndex(index + 1), // <-- increment index
      6000
    );
    if (index === reviews.results.length) {
      setIndex((index) => index - reviews.results.length);
    }
    return () => clearInterval(timerId);
  }, [index]);
  useEffect(() => {
    setMediaItem([reviews.results[index]]); // <-- update media state when index updates
  }, [index]);

  let [color] = useState("#ffffff");
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  let movieObject = location.state;
  let array = [movieObject];
  const { Meta } = Card;
  let baseURl = "https://image.tmdb.org/t/p/original/";
  let [{ cast, crew }] = castCrew;
  let billedCast = cast.slice(0, 9);
  let charactersNamesList = crew.filter((item) =>
    item.job === "Characters" ? item : !item
  );
  let filteredCharactersNamesList = charactersNamesList.map(
    (item) => item.name
  );
  function handleComponentPage(e, item) {
    navigate("/Movies-data", { state: item });
  }
  const getVideosTrailer = useSelector((state) => state.SagaReducer.moviesId);
  const sagaLoading = useSelector((state) => state.SagaReducer.loading);
  let [data] = getVideosTrailer;
  let { id, results } = data;
  let trailerObj = results.filter((item) =>
    item.name === "Official Trailer" ? item : !item
  );
  const trailerBaseURl = "http://www.youtube.com/watch?v=";

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    // setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    // console.log("Clicked cancel button");
    setOpen(false);
  };
  const items = [
    {
      key: "1",
      label: `Reviews`,
      children: `Content of Tab Pane 1`,
    },
    {
      key: "2",
      label: `Discussions`,
      children: `Content of Tab Pane 2`,
    },
  ];
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <React.Fragment>
      {sagaLoading ? (
        <ClipLoader
          color={color}
          loading={true}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <Row>
          <Col lg={24} md={24} xl={24}>
            {array.map((item) => {
              let year = new Date(item.release_date).getFullYear();
              let onlyGenreNames = item.genre_ids.map((item1) =>
                genreId.find((item) => item1 === item.id)
              );
              return (
                <React.Fragment>
                  <Row
                    className="img"
                    style={{
                      backgroundColor: "#20205F",
                      backgroundImage: `url(${baseURl + item.backdrop_path})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    {/* <Col lg={2}></Col> */}
                    <Col lg={6} md={8}>
                      <Card
                        style={{ width: 250, margin: "20px" }}
                        cover={
                          <img alt={"yes"} src={baseURl + item.poster_path} />
                        }
                      ></Card>
                    </Col>
                    <Col lg={18} md={14}>
                      <span>
                        <h1 style={{ color: "white" }}>
                          {item.title} ({year}){" "}
                        </h1>
                        <h3 style={{ color: "white" }}>
                          {item.release_date}
                          {onlyGenreNames.map((item, index) => {
                            return (
                              <>
                                <Button
                                  key={index}
                                  style={{
                                    border: "none",
                                    background: "none",
                                    color: "white",
                                  }}
                                  onClick={(e) => {
                                    return (
                                      handleComponentPage(e, { item }),
                                      dispatch(productList(item))
                                    );
                                  }}
                                >
                                  {item.name}
                                </Button>
                              </>
                            );
                          })}
                          {trailerObj &&
                            trailerObj.map((item) => {
                              return (
                                <React.Fragment>
                                  <Button
                                    type="primary"
                                    style={{
                                      // background: "none",
                                      // border: "none",
                                      color: "white",
                                    }}
                                    onClick={() => {
                                      return showModal(), setVideo(true);
                                    }}
                                  >
                                    Trailer
                                  </Button>
                                  {video && (
                                    <Modal
                                      title="PlayTrailer"
                                      open={open}
                                      onCancel={handleCancel}
                                      width={1000}
                                      height={200}
                                      footer={null}
                                    >
                                      <ReactPlayer
                                        width={1000}
                                        height={500}
                                        url={trailerBaseURl + item.key}
                                      />
                                    </Modal>
                                  )}
                                </React.Fragment>
                              );
                            })}
                          <p>Overview</p>
                          <p>{item.overview}</p>

                          {/* <ol style={{ display: "flex",flexWrap:"wrap",justifyContent:"flex-start" }}> */}
                          <Row>
                            {filteredCharactersNamesList &&
                              filteredCharactersNamesList.map((item) => {
                                return (
                                  <React.Fragment>
                                    <Col lg={8} md={8} sm={8}>
                                      {item}
                                      <span>
                                        <br /> character
                                      </span>
                                      {/* <p>character</p> */}
                                    </Col>
                                  </React.Fragment>
                                );
                              })}
                          </Row>
                          {/* </ol> */}
                          {/* <ol>
                        {filteredCharactersNamesList &&
                          filteredCharactersNamesList.map((item) => {
                            return (
                              <React.Fragment>
                                <li style={{ display: "inline" }}>characters</li>
                              </React.Fragment>
                            );
                          })}
                          </ol> */}
                        </h3>
                      </span>
                    </Col>
                  </Row>
                </React.Fragment>
              );
            })}
          </Col>
        </Row>
      )}
      ;
      <Row>
        <Col lg={1} />
        <Col lg={3}>
          <h2>Top Billed Cast</h2>
        </Col>
        <Col lg={16} />
        <Col lg={4}>
          <Space>
            <FacebookFilled />
            <TwitterOutlined />
            <InstagramOutlined />
          </Space>
        </Col>
      </Row>
      {sagaLoading ? (
        <ClipLoader
          color={color}
          loading={true}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <Row>
          <Col lg={1} />
          <Col lg={17}>
            {/* <section style={{overFlow:"hidden",display:"flex"}}> */}
            {/* <div class="scrollmenu"> */}
            {/* <div class="scrolling-wrapper"> */}
            <Row className="scrolling-wrapper">
              {/* <Col lg={10}> */}

              {billedCast &&
                billedCast.map((item) => {
                  return (
                    <React.Fragment>
                      <Col lg={4}>
                        <Card
                          hoverable
                          style={{ width: 130 }}
                          cover={
                            <img
                              alt="example"
                              src={baseURl + item.profile_path}
                            />
                          }
                        >
                          <span style={{ whiteSpace: "pre-line" }}>
                            <b>{item.name}</b>
                            <br /> <span>{item.character}</span>
                          </span>
                        </Card>
                      </Col>
                    </React.Fragment>
                  );
                })}
              {/* </Col> */}
              <Card
                // hoverable
                style={{ width: 130, border: "none" }}
                // cover={
                //  <Button type="primary">View More</Button>
                // }
              >
                <Space
                  direction="vertical"
                  className="vertical-center"
                  style={{ width: "100%" }}
                >
                  <Button style={{ border: "none" }} block>
                    View More <ArrowRightOutlined />
                  </Button>
                  {/* <a href="#" block>View More</a> */}
                </Space>
                {/* <Meta
                          
                            // title={item.name}
                            // description={item.character}
                          /> */}
              </Card>
            </Row>
            {/* </div> */}
            {/* </div> */}

            {/* </section> */}
          </Col>
          <Col lg={6}>
            <ul
              style={{
                listStyleType: "none",
                lineHeight: "29px",
                fontWeight: "10px",
                // overflowClipBox:""
                // wordWrap:"break-word"
                // whiteSpace: "pre-line"
              }}
            >
              {budgetRevenue &&
                budgetRevenue.map((item) => {
                  let [language] = item.spoken_languages;
                  return (
                    <React.Fragment>
                      <li>
                        <b>Status</b>
                      </li>
                      <li>{item.status}</li>
                      <li>
                        <b>Original Language </b>
                      </li>
                      <li>{language.name}</li>
                      <li>
                        <b>Budget</b>
                      </li>
                      <li>{item.budget}</li>
                      <li>
                        <b>Revenue</b>
                      </li>
                      <li>{item.revenue}</li>
                      {/* {} */}
                    </React.Fragment>
                  );
                })}
              <li>
                <b>Keywords</b>
              </li>
              <div>
                {keywordss.keywords &&
                  keywordss.keywords.map((item) => {
                    return (
                      <React.Fragment>
                        <Button
                          className="keyWordsBtn"
                          style={{ backgroundColor: "lightgray" }}
                        >
                          {item.name}
                        </Button>
                      </React.Fragment>
                    );
                  })}
              </div>
            </ul>
          </Col>
        </Row>
      )}
      ;
      <Row>
        <Col lg={1} />
        <Col lg={17}>
          <div>
            <h2>Social</h2>
            <Tabs
              defaultActiveKey="1"
              style={{ marginBottom: 32 }}
              items={
                mediaItem &&
                mediaItem.map((item, index) => {
                  let stringPart = item.content.slice(0, 559);
                  let date = new Date(item.updated_at);
                  const monthNames = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ];
                  let year = date.getFullYear();
                  let datee = date.getDate();
                  let month = monthNames[date.getMonth()];

                  return {
                    label: `Reviews ${reviews.results.length}`,
                    key: index,
                    children: (
                      <p>
                        a review by {item.author} <StarFilled />{" "}
                        {item.author_details.rating} written by {item.author} on{" "}
                        {month} {datee} ,{year}
                        {stringPart} <a>Read More</a>
                      </p>
                    ),
                  };
                })
              }
            />
            <Button type="primary">
              <Link to="/testing">Testing</Link>
            </Button>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
}
