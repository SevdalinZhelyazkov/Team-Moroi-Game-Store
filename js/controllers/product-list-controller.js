import { requester } from 'requester';
import { templateLoader } from 'template-loader';
import { productsData } from 'products-data';

const productListController = {
    show(context) {
        return Promise
            .all([
                productsData.getProducts(),
                templateLoader.load('product-list')
            ])
            .then((data) => {
                const productsData = data[0];
                const template = data[1];

                $('.game-box-container').html(template(productsData));
            });
    }
};

export { productListController };
