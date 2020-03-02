import React, { Component, ComponentClass } from "react";
import { FlatListProps, FlatList, ListRenderItem } from "react-native";
import styled from "styled-components/native";
import { StackNavigationProp } from "@react-navigation/stack";

import withLoading, { ILoadingProps } from "src/hocs/withLoading";
import { MovieItem, movies } from "src/apis/movie";

interface Props extends ILoadingProps {
  navigation: StackNavigationProp<any>;
}

interface States {
  movieItems: any[];
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #eee;
`;

const Movies = styled<ComponentClass<FlatListProps<MovieItem>>>(FlatList).attrs(
  {
    contentContainerStyle: {
      paddingBottom: 95,
      paddingHorizontal: 20
    }
  }
)`
  flex: 1;
  width: 100%;
`;

const MovieItemView = styled.View`
  flex-direction: row;
  align-items: center;
  height: 50px;
  background-color: #eee;
`;

const ItemTitle = styled.Text`
  flex: 3;
`;

const ItemRating = styled.Text`
  flex: 1;
  text-align: right;
`;

class MovieScreen extends Component<Props, States> {
  public static open(navigation: StackNavigationProp<any>): void {
    navigation.navigate("Movie");
  }

  constructor(props: Props) {
    super(props);

    this.state = {
      movieItems: []
    };
    this.initialize = props.wrapperLoading?.(this.initialize);
  }

  public async componentDidMount() {
    await this.initialize();
  }

  public render() {
    const { movieItems } = this.state;
    return (
      <Container>
        <Movies
          data={movieItems}
          keyExtractor={this.movieItemKeyExtractor}
          renderItem={this.renderMovieItem}
        />
      </Container>
    );
  }

  private initialize = async () => {
    this.setState({
      movieItems: await movies()
    });
  };

  private movieItemKeyExtractor = (item: MovieItem, index: number) => {
    return `${item.id}${index}`;
  };

  private renderMovieItem: ListRenderItem<MovieItem> = ({ item }) => {
    const { title, rating } = item;
    return (
      <MovieItemView>
        <ItemTitle>{title}</ItemTitle>
        <ItemRating>{rating}</ItemRating>
      </MovieItemView>
    );
  };
}

export default MovieScreen;
