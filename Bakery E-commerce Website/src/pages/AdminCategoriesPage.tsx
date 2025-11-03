import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { categories as initialCategories } from '../lib/mockData';
import { Category } from '../types';
import { Button, Input, Textarea, Label } from '../components/styled';
import { Card, CardContent, CardHeader } from '../components/styled';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/styled';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/styled';
import * as S from './AdminPages.styled';

export function AdminCategoriesPage() {
  const [categoriesList, setCategoriesList] = useState(initialCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const filteredCategories = categoriesList.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenDialog = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description,
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        description: '',
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingCategory) {
      // Update existing category
      setCategoriesList(prev =>
        prev.map(c =>
          c.id === editingCategory.id
            ? {
                ...c,
                name: formData.name,
                description: formData.description,
              }
            : c
        )
      );
    } else {
      // Add new category
      const newCategory: Category = {
        id: 'cat-' + Date.now(),
        name: formData.name,
        description: formData.description,
        createdAt: new Date().toISOString(),
      };
      setCategoriesList(prev => [...prev, newCategory]);
    }

    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategoriesList(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>Categories Management</S.Title>
        <Button onClick={() => handleOpenDialog()}>
          <Plus />
          Add Category
        </Button>
      </S.Header>

      <Card>
        <CardHeader>
          <S.SearchWrapper>
            <Search />
            <Input
              placeholder="Search categories..."
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
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map(category => (
                <TableRow key={category.id}>
                  <TableCell>
                    <p>{category.name}</p>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {category.description}
                  </TableCell>
                  <TableCell>
                    {new Date(category.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <S.ActionsGroup>
                      <Button
                        $variant="ghost"
                        $size="icon"
                        onClick={() => handleOpenDialog(category)}
                      >
                        <Pencil />
                      </Button>
                      <Button
                        $variant="ghost"
                        $size="icon"
                        onClick={() => handleDelete(category.id)}
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
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <S.FormGrid>
              <S.FormField>
                <Label>Category Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Cakes"
                  required
                />
              </S.FormField>

              <S.FormField>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Delicious cakes for every occasion"
                  required
                />
              </S.FormField>
            </S.FormGrid>

            <DialogFooter>
              <Button type="button" $variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingCategory ? 'Update' : 'Create'} Category
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </S.Container>
  );
}
