const client = require("./client");

exports.getItemsList = (query) => {
  const maxAmount = 4;

  return client.search(query).then((response) => {
    const author = {
      name: "Julian",
      lastname: "Macho Fraga",
    };
    const categories =
      response.filters.length && response.filters[0].values
        ? response.filters[0].values[0].path_from_root.map(
            (category) => category.name
          )
        : [];
    const items = response.results
      .map((item) => {
        const [amount, decimals] = item.price.toString().split(".");

        return {
          id: item.id,
          title: item.title,
          price: {
            currency: item.currency_id,
            amount: parseInt(amount),
            decimals: parseInt(decimals),
          },
          picture: item.thumbnail,
          condition: item.condition,
          state: item.address.state_name,
          free_shipping: item.shipping.free_shipping,
        };
      })
      .slice(0, maxAmount);

    return {
      author,
      categories,
      items,
    };
  });
};

exports.getItemDetail = (query) => {
  return client.getItemData(query).then((responses) => {
    const [item, description] = responses;
    const [amount, decimals] = item.price.toString().split(".");

    return {
      author: {
        name: "Julian",
        lastname: "Macho Fraga",
      },
      item: {
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: parseInt(amount),
          decimals: parseInt(decimals),
        },
        picture: item.pictures[0].url,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
        sold_quantity: item.sold_quantity,
        description: description.plain_text,
      },
    };
  });
};
