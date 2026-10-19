import { it, expect, describe, vi, afterEach } from "vitest";
import ProductsPage from "./ProductsPage.jsx";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";

afterEach(() => {
    vi.restoreAllMocks();
});
describe("ProductsPage", () => {
    it("shows a loading message while products are being fetched", () => {
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
            },
        });
        vi.spyOn(globalThis, "fetch");
        vi.mocked(fetch).mockReturnValue(new Promise(() => {}));
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ProductsPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(screen.getByRole("status")).toHaveTextContent("Loading products…");

    })

    it("displays products when fetching succeeds", async () => {
        const products = [
            {
                id: "1",
                title: "Tea Cup",
                price:5,
                image: "tea-cup.jpg",
                category: "Home",
            }
        ]
        vi.spyOn(globalThis, "fetch").mockResolvedValue({
            ok: true,
            json: async () => products,
        });
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
            },
        });

       render(
           <QueryClientProvider client={queryClient}>
               <MemoryRouter>
                   <ProductsPage />
               </MemoryRouter>
           </QueryClientProvider>
       )
        const productTitle = await screen.findByText("Tea Cup");
        expect(productTitle).toBeInTheDocument();

        const productPrice = await screen.findByText("$5.00");
        expect(productPrice).toBeInTheDocument();
    })

    it("shows an error message when fetching products fails", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValue({
            ok: false,
            json: async () => ({}),
        });
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
            },
        });

        render (
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ProductsPage />
                </MemoryRouter>
            </QueryClientProvider>
        )
        const errorMessage = await screen.findByRole("alert");
        expect(errorMessage).toHaveTextContent(
            "Unable to load products: Failed to fetch products"
        );
    });

    })

