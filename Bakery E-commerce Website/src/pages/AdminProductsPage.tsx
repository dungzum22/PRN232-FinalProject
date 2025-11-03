import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { products as initialProducts, categories } from '../lib/mockData';
import { Product } from '../types';
import { Button, Input, Textarea, Label } from '../components/styled';
import { Card, CardContent, CardHeader, CardTitle } from '../components/styled';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/styled';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/styled';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/styled';
import { Badge } from '../components/styled';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import * as S from './AdminPages.styled';

export function AdminProductsPage() {
  const [productsList, setProductsList] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    stock: '',
    image: '',
  });

  const filteredProducts = productsList.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        categoryId: product.categoryId,
        stock: product.stock.toString(),
        image: product.image,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        categoryId: categories[0].id,
        stock: '',
        image: '',
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const category = categories.find(c => c.id === formData.categoryId);
    
    if (editingProduct) {
      // Update existing product
      setProductsList(prev =>
        prev.map(p =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                categoryId: formData.categoryId,
                categoryName: category?.name || '',
                stock: parseInt(formData.stock),
                image: formData.image,
              }
            : p
        )
      );
    } else {
      // Add new product
      const newProduct: Product = {
        id: 'prod-' + Date.now(),
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        categoryId: formData.categoryId,
        categoryName: category?.name || '',
        stock: parseInt(formData.stock),
        image: formData.image,
        rating: 0,
        reviewCount: 0,
        createdAt: new Date().toISOString(),
      };
      setProductsList(prev => [...prev, newProduct]);
    }

    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProductsList(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>Products Management</S.Title>
        <Button onClick={() => handleOpenDialog()}>
          <Plus />
          Add Product
        </Button>
      </S.Header>

      <Card>
        <CardHeader>
          <S.SearchWrapper>
            <Search />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </S.SearchWrapper>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map(product => (
                <TableRow key={product.id}>
                  <TableCell>
                    <S.ProductImage>
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                      />
                    </S.ProductImage>
                  </TableCell>
                  <TableCell>
                    <S.ProductInfo>
                      <S.ProductName>{product.name}</S.ProductName>
                      <S.ProductCategory>
                        {product.description}
                      </S.ProductCategory>
                    </S.ProductInfo>
                  </TableCell>
                  <TableCell>
                    <Badge $variant="outline">{product.categoryName}</Badge>
                  </TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        product.stock === 0
                          ? 'bg-red-500'
                          : product.stock < 5
                          ? 'bg-orange-500'
                          : 'bg-green-500'
                      }
                    >
                      {product.stock}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {product.rating.toFixed(1)} ({product.reviewCount})
                  </TableCell>
                  <TableCell>
                    <S.ActionsGroup>
                      <Button
                        $variant="ghost"
                        $size="icon"
                        onClick={() => handleOpenDialog(product)}
                      >
                        <Pencil />
                      </Button>
                      <Button
                        $variant="ghost"
                        $size="icon"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 style={{ color: '#ef4444' }} />
                      </Button>
                    </S.ActionsGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <S.FormGrid>
              <S.FormField>
                <Label>Product Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Chocolate Dream Cake"
                  required
                />
              </S.FormField>

              <S.FormField>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Delicious chocolate cake..."
                  required
                />
              </S.FormField>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <S.FormField>
                  <Label>Price ($)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="45.99"
                    required
                  />
                </S.FormField>

                <S.FormField>
                  <Label>Stock</Label>
                  <Input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="10"
                    required
                  />
                </S.FormField>
              </div>

              <S.FormField>
                <Label>Category</Label>
                <Select value={formData.categoryId} onValueChange={(value) => setFormData({ ...formData, categoryId: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </S.FormField>

              <S.FormField>
                <Label>Image URL</Label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  required
                />
                {formData.image && (
                  <S.ImagePreview>
                    <img src={formData.image} alt="Preview" />
                  </S.ImagePreview>
                )}
              </S.FormField>
            </S.FormGrid>

            <DialogFooter>
              <Button type="button" $variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingProduct ? 'Update' : 'Create'} Product
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </S.Container>
  );
}
