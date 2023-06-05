import React from "react";
import { Table, Col, Row, Button, Space } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { productList } from "../ReduxSaga/actions/productAction";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
const { Column, ColumnGroup } = Table;

export function GenreIds() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   dispatch(fetchMoviesData());
  // }, []);
  // 640146
  // let id = 385687;
  // let getApiData = async () => {
  //   let response = await axios.get(
  //     `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=c12531a82a60035f2bcdef9bb2c8ff3c&language=en-US`
  //   );
  //   console.log(response);
  // };
  // getApiData();
  let thunkLoading = useSelector((state) => state.MoviesGenreReducer.loading);
  let stat = useSelector((state) => state.MoviesGenreReducer.data.genres);
  let [color] = useState("#ffffff");
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  function handleCategory(e, item) {
    // console.log(item.record.name,"item");
    navigate(`/Movies-data/`, { state: item });
  }
  return (
    <React.Fragment>
      <Row>
        <Col lg={8}></Col>
        <Col lg={8}>
          {/* {thunkLoading ? <ClipLoader></ClipLoader>:<Table dataSource={stat}> */}
          {thunkLoading ? (
            <ClipLoader
              color={color}
              loading={true}
              cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <Table dataSource={stat} rowKey={(record) => record.id}>
              <ColumnGroup>
                <Column title="Id" dataIndex="id" />
                <Column title="Name" dataIndex="name" />
              </ColumnGroup>
              <Column
                title="Action"
                key="action"
                render={(record) => (
                  <Space size="middle">
                    <Button
                      type="primary"
                      onClick={(e) => {
                        return (
                          handleCategory(e, { record }),
                          dispatch(productList(record.id))
                        );
                      }}
                    >
                      Movies
                    </Button>
                  </Space>
                )}
              />
            </Table>
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
}
