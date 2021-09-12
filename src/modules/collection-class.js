class DataCollection {
  constructor(model) {
    this.model = model;
  }

  get(id) {
    if (id) {
      return this.model.findOne({ where: { id } });
    } else {
      return this.model.findAll({});
    }
  }

  create(record) {
    return this.model.create(record);
  }

  update(id, data) {
    return this.model
      .findOne({ where: { id } })
      .then((record) => record.update(data));
  }

  delete(id) {
    return this.model.destroy({ where: { id } });
  }

  //    !------------------- Reviews

  async getProductReviewsInfo(ProductID) {
    let allRecords = await this.model.findAll({ where: { ProductID } });
    let rating =
      allRecords
        .map((ele) => ele.Rating)
        .reduce((acc, ele) => {
          acc = acc + ele;
          return acc;
        }, 0) / allRecords.length;

    return { rating, number: allRecords.length };
  }

  async getProductReviews(ProductID, users) {
    let allRecords = await this.model.findAll({ where: { ProductID } });
    let finallRecords = await Promise.all(
      allRecords.map(async (ele) => {
        let userInfo = await users.findOne({
          where: { id: ele.UserID },
        });

        ele.UserID = {
          id: userInfo.id,
          username: userInfo.username,
          firstname: userInfo.firstname,
          lastname: userInfo.lastname,
          email: userInfo.email,
        };

        return ele;
      })
    );
    return finallRecords;
  }
  //    !------------------- Cart

  async getProductFromCart(UserID, products) {
    let allRecords = await this.model.findAll({ where: { UserID } });
    let finallRecords = await Promise.all(
      allRecords.map(async (ele) => {
        return await products.get(ele.ProductID);
      })
    );
    return finallRecords;
  }

  async getProductInfoFromCart(UserID, products) {
    let allRecords = await this.model.findAll({ where: { UserID } });
    let finallRecords = await Promise.all(
      allRecords.map(async (ele) => await products.get(ele.ProductID))
    );
    return finallRecords.reduce(
      (acc, ele) => {
        acc.totalPrice = acc.totalPrice + ele.Price;
        acc.totalItems = acc.totalItems + 1;
        return acc;
      },
      { totalPrice: 0, totalItems: 0 }
    );
  }

  //    !------------------- WishList

  async getProductFromWishlist(UserID, products) {
    let allRecords = await this.model.findAll({ where: { UserID } });
    let finallRecords = await Promise.all(
      allRecords.map(async (ele) => {
        return await products.get(ele.ProductID);
      })
    );
    return finallRecords;
  }
  async getProductInfoFromWishlist(UserID, products) {
    let allRecords = await this.model.findAll({ where: { UserID } });
    let finallRecords = await Promise.all(
      allRecords.map(async (ele) => await products.get(ele.ProductID))
    );
    return finallRecords.reduce(
      (acc, ele) => {
        acc.totalPrice = acc.totalPrice + ele.Price;
        acc.totalItems = acc.totalItems + 1;
        return acc;
      },
      { totalPrice: 0, totalItems: 0 }
    );
  }

  //    !------------------- Order

  async getProductFromOrder(UserID, orderDetails, products) {
    let allRecords = await this.model.findAll({ where: { UserID } });
    let finallRecords = await Promise.all(
      allRecords.map(async (ele) => {
        return await orderDetails.get(ele.OrderID);
      })
    );
    let productsList = await Promise.all(
      finallRecords[0].map(async (ele) => {
        return await products.get(ele.ProductID);
      })
    );
    return { productsList, orderState: allRecords[0].State };
  }

  async getProductInfoFromOrder(UserID, orderDetails, products) {
    let allRecords = await this.model.findAll({ where: { UserID } });
    let finallRecords = await Promise.all(
      allRecords.map(async (ele) => {
        return await orderDetails.get(ele.OrderID);
      })
    );
    finallRecords = await Promise.all(
      finallRecords[0].map(async (ele) => {
        return await products.get(ele.ProductID);
      })
    );
    return finallRecords.reduce(
      (acc, ele) => {
        acc.totalPrice = acc.totalPrice + ele.Price;
        acc.totalItems = acc.totalItems + 1;
        return acc;
      },
      { totalPrice: 0, totalItems: 0 }
    );
  }
}

module.exports = DataCollection;