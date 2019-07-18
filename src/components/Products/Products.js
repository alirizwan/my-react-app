import React, { Component } from "react";
import { Icon } from "native-base";
import { StackNavigator } from "react-navigation";

import Login from "../Login/Login";
import ProductListPage from "./ProductList/ProductListPage";
import ProductDetailPage from "./ProductDetail/ProductDetailPage";
import OrderListPage from "../Orders/OrderList/OrderListPage";
import OrderDetailPage from "../Orders/OrderDetail/OrderDetailPage";
import OpportunityListPage from '../Opportunities/OpportunityList/OpportunityListPage';
import OpportunityDetailPage from '../Opportunities/OpportunityDetail/OpportunityDetailPage';
import ApplicationsListPage from "../Opportunities/ApplicationList/ApplicationsListPage";
import ApplicationDetailPage from "../Opportunities/ApplicationDetail/ApplicationDetailPage";

class Products extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) =>
      <Icon name="pricetags" style={{ color: tintColor }} />
  };

  getRoutes() {
    return {
      Login: { screen: Login, path: "login" },

      ProductList: { screen: ProductListPage, path: "" },
      ProductDetail: { screen: ProductDetailPage, path: "products/:product" },

      OpportunityList: { screen: OpportunityListPage, path: "product/:product/opportunities" },
      OpportunityDetail: { screen: OpportunityDetailPage, path: "product/:product/opportunities/:opportunity" },

      OrderList: { screen: OrderListPage, path: "product/:product/orders" },
      OrderDetail: { screen: OrderDetailPage, path: "product/:product/orders/:order" },

      ApplicationsList: { screen: ApplicationsListPage, path: "product/:product/opportunities/:opportunity/applications" },
      ApplicationDetail: { screen: ApplicationDetailPage, path: "product/:product/opportunities/:opportunity/applications/:application" }
    };
  }

  getOptions() {
    return {
      initialRouteName: "ProductList",
      headerMode: "none",
      cardStyle: { backgroundColor: "#fff" }
    };
  }

  render() {
    const Navigation = StackNavigator(this.getRoutes(), this.getOptions());

    const screenProps = {
      rootNavigation: this.props.navigation
    };

    return <Navigation screenProps={screenProps} />;
  }
}

export default Products;
