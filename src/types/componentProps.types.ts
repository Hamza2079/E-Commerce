export interface ProductCardProps {
  product: import('./product.types').ProductI;
}

export interface ProductImageProps {
  imageCover: string;
  title: string;
  productId: string;
  inStock: boolean;
  sold: number;
}

export interface ProductImageGalleryProps {
  images: string[];
  title: string;
  imageCover: string;
}

export interface ProductActionsProps {
  productId: string;
  productTitle: string;
  price: number;
  inStock: boolean;
  quantity: number;
}

export interface WishlistButtonProps {
  productId: string;
  productTitle: string;
  price: number;
  inStock: boolean;
}

export interface AddToCartButtonProps {
  productId: string;
  productTitle: string;
  price: number;
  inStock: boolean;
}
