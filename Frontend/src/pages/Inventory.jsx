import { useEffect, useState } from "react";

import InventoryForm from "../components/InventoryForm.inventory";
import InventoryTable from "../components/InventoryTable.inventory";

import {
    stockIn,
    stockOut,
    getInventoryHistory,
} from "../api/inventory.api";

import { getProducts } from "../api/product.api";

function Inventory() {

    const [products, setProducts] = useState([]);

    const [history, setHistory] = useState([]);

    const [loading, setLoading] = useState(true);

    // =============================
    // Products
    // =============================

    const fetchProducts = async () => {

        try {

            const response = await getProducts();

            const activeProducts = response.data.filter(
                (product) => !product.isDeleted
            );

            setProducts(activeProducts);

        } catch (error) {

            console.log(error);

        }

    };

    // =============================
    // History
    // =============================

    const fetchHistory = async () => {

        try {

            const response = await getInventoryHistory();

            setHistory(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    // =============================
    // Stock In
    // =============================

    const handleStockIn = async (data) => {

        try {

            const response = await stockIn(data);

            alert(response.message);

            await fetchHistory();

            await fetchProducts();

        } catch (error) {

            alert(error.response?.data?.message);

        }

    };

    // =============================
    // Stock Out
    // =============================

    const handleStockOut = async (data) => {

        try {

            const response = await stockOut(data);

            alert(response.message);

            await fetchHistory();

            await fetchProducts();

        } catch (error) {

            alert(error.response?.data?.message);

        }

    };

    useEffect(() => {

        const loadData = async () => {

            setLoading(true);

            await Promise.all([
                fetchProducts(),
                fetchHistory(),
            ]);

            setLoading(false);

        };

        loadData();

    }, []);

    return (

        <div>

            <h1>Inventory Management</h1>

            <InventoryForm
                products={products}
                onStockIn={handleStockIn}
                onStockOut={handleStockOut}
            />

            <InventoryTable
                history={history}
                loading={loading}
            />

        </div>

    );

}

export default Inventory;