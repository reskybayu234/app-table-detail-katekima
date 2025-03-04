import { defineStore } from "pinia";
import axios from "axios";

interface Berry {
    id: number;
    name: string;
    url: string;
}

interface BerryDetail {
    id: number;
    name: string;
    growth_time: number;
    max_harvest: number;
    natural_gift_power: number;
    size: number;
    smoothness: number;
    soil_dryness: number;
    firmness: {
        name: string;
        url: string;
    };
    flavors: Array<{
        potency: number;
        flavor: {
            name: string;
            url: string;
        };
    }>;
}

interface Product {
    id?: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
}

export const useBerryStore = defineStore("berry", {
    state: () => ({
        berries: [] as Berry[],
        filteredBerries: [] as Berry[],
        currentPage: 1,
        itemsPerPage: 10,
        searchQuery: "",
        selectedBerry: null as BerryDetail | null,
        loading: false,
        products: [] as Product[],
        selectedProduct: null as Product | null,
    }),

    getters: {
        paginatedBerries: (state) => {
            const start = (state.currentPage - 1) * state.itemsPerPage;
            const end = start + state.itemsPerPage;
            return state.filteredBerries.slice(start, end);
        },
        totalPages: (state) => {
            return Math.ceil(state.filteredBerries.length / state.itemsPerPage);
        },
    },

    actions: {
        async fetchBerries() {
            this.loading = true;
            try {
                const response = await axios.get("https://pokeapi.co/api/v2/berry/");
                const results = response.data.results;

                // Add id to each berry based on the URL
                this.berries = results.map((berry: any, index: number) => {
                    const id = index + 1;
                    return { ...berry, id };
                });

                // Sort berries by name (ascending)
                this.berries.sort((a, b) => a.name.localeCompare(b.name));

                this.applyFilters();

                // Restore page and search from localStorage if available
                const savedPage = localStorage.getItem("currentPage");
                const savedSearch = localStorage.getItem("searchQuery");
                const savedItemsPerPage = localStorage.getItem("itemsPerPage");

                if (savedPage) this.currentPage = parseInt(savedPage);
                if (savedSearch) this.searchQuery = savedSearch;
                if (savedItemsPerPage) this.itemsPerPage = parseInt(savedItemsPerPage);

                this.applyFilters();
            } catch (error) {
                console.error("Error fetching berries:", error);
            } finally {
                this.loading = false;
            }
        },

        async fetchBerryDetail(id: number) {
            this.loading = true;
            try {
                const response = await axios.get(
                    `https://pokeapi.co/api/v2/berry/${id}/`
                );
                this.selectedBerry = response.data;
            } catch (error) {
                console.error("Error fetching berry detail:", error);
            } finally {
                this.loading = false;
            }
        },

        async addProduct(product: Product) {
            this.loading = true;
            try {
                const response = await axios.post(
                    "https://fakestoreapi.com/products",
                    product
                );
                this.products.push(response.data);
                return response.data;
            } catch (error) {
                console.error("Error adding product:", error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async fetchProduct(id: number) {
            this.loading = true;
            try {
                const response = await axios.get(
                    `https://fakestoreapi.com/products/${id}`
                );
                this.selectedProduct = response.data;
                return response.data;
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                this.loading = false;
            }
        },

        async updateProduct(id: number, product: Product) {
            this.loading = true;
            try {
                const response = await axios.put(
                    `https://fakestoreapi.com/products/${id}`,
                    product
                );
                return response.data;
            } catch (error) {
                console.error("Error updating product:", error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async deleteProduct(id: number) {
            this.loading = true;
            try {
                await axios.delete(`https://fakestoreapi.com/products/${id}`);
                // Remove from local array if needed
            } catch (error) {
                console.error("Error deleting product:", error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        setPage(page: number) {
            this.currentPage = page;
            localStorage.setItem("currentPage", page.toString());
        },

        setItemsPerPage(items: number) {
            this.itemsPerPage = items;
            this.currentPage = 1; // Reset to first page when changing items per page
            localStorage.setItem("itemsPerPage", items.toString());
        },

        setSearchQuery(query: string) {
            this.searchQuery = query;
            localStorage.setItem("searchQuery", query);
            this.applyFilters();
        },

        applyFilters() {
            if (this.searchQuery) {
                this.filteredBerries = this.berries.filter((berry) =>
                    berry.name.toLowerCase().includes(this.searchQuery.toLowerCase())
                );
            } else {
                this.filteredBerries = [...this.berries];
            }
        },
    },
});
