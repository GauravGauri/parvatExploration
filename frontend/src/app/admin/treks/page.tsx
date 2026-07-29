'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Loader } from '@/components/ui/Loader';
import { Trash2, Edit, Plus, X } from 'lucide-react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function AdminTreksPage() {
  const [treks, setTreks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrek, setEditingTrek] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '', price: '', days: '', diff: '', category: '', description: '', date: '', inclusions: '', exclusions: ''
  });
  const [itinerary, setItinerary] = useState([{ day: 1, title: '', details: '' }]);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImage1, setGalleryImage1] = useState<File | null>(null);
  const [galleryImage2, setGalleryImage2] = useState<File | null>(null);
  const [galleryImage3, setGalleryImage3] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchTreks = async () => {
    try {
      const { data } = await api.get('/treks');
      setTreks(data);
    } catch (error) {
      toast.error('Failed to load treks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreks();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this trek?')) return;
    try {
      await api.delete(`/treks/${id}`);
      toast.success('Trek deleted');
      fetchTreks();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete trek');
    }
  };

  const openModal = (trek: any = null) => {
    setEditingTrek(trek);
    if (trek) {
      setFormData({
        title: trek.title,
        price: trek.price,
        days: trek.days,
        diff: trek.diff,
        category: trek.category,
        description: trek.description || '',
        date: trek.date ? new Date(trek.date).toISOString().split('T')[0] : '',
        inclusions: trek.inclusions ? trek.inclusions.join('\n') : '',
        exclusions: trek.exclusions ? trek.exclusions.join('\n') : ''
      });
      setItinerary(trek.itinerary && trek.itinerary.length > 0 ? trek.itinerary : [{ day: 1, title: '', details: '' }]);
    } else {
      setFormData({ title: '', price: '', days: '', diff: '', category: '', description: '', date: '', inclusions: '', exclusions: '' });
      setItinerary([{ day: 1, title: '', details: '' }]);
    }
    setMainImage(null);
    setGalleryImage1(null);
    setGalleryImage2(null);
    setGalleryImage3(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'inclusions' || key === 'exclusions') {
        const arr = (value as string).split('\n').filter(s => s.trim() !== '');
        data.append(key, JSON.stringify(arr));
      } else {
        data.append(key, value as string);
      }
    });
    data.append('itinerary', JSON.stringify(itinerary));

    if (mainImage) data.append('image', mainImage);
    if (galleryImage1) data.append('images', galleryImage1);
    if (galleryImage2) data.append('images', galleryImage2);
    if (galleryImage3) data.append('images', galleryImage3);

    try {
      if (editingTrek) {
        await api.put(`/treks/${editingTrek._id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Trek updated successfully');
      } else {
        await api.post('/treks', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Trek created successfully');
      }
      setIsModalOpen(false);
      fetchTreks();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save trek');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loader message="Loading treks..." />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-heading text-slate-900">Manage Treks</h1>
        <Button onClick={() => openModal()} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Trek
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="p-4 font-semibold text-slate-600">Image</th>
                <th className="p-4 font-semibold text-slate-600">Title</th>
                <th className="p-4 font-semibold text-slate-600">Date</th>
                <th className="p-4 font-semibold text-slate-600">Price</th>
                <th className="p-4 font-semibold text-slate-600">Duration</th>
                <th className="p-4 font-semibold text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {treks.map((t) => {
                const isPast = t.date && new Date(t.date) < new Date();
                return (
                <tr key={t._id} className={`hover:bg-slate-50/50 ${isPast ? 'opacity-50' : ''}`}>
                  <td className="p-4">
                    <img src={t.image} alt={t.title} className="w-12 h-12 rounded-lg object-cover" />
                  </td>
                  <td className="p-4 font-medium text-slate-900">{t.title}</td>
                  <td className="p-4 text-slate-600">{t.date ? new Date(t.date).toLocaleDateString() : 'N/A'}</td>
                  <td className="p-4 text-slate-600">{t.price}</td>
                  <td className="p-4 text-slate-600">{t.days}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => openModal(t)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-rose-600 hover:bg-rose-50 border-rose-200"
                        onClick={() => handleDelete(t._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold font-heading">{editingTrek ? 'Edit Trek' : 'Add New Trek'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Trek Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-semibold text-slate-900">Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-rose-500"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Price (e.g. ₹8,500)"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
                <Input
                  label="Duration (e.g. 6 Days)"
                  value={formData.days}
                  onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Difficulty (e.g. Moderate)"
                  value={formData.diff}
                  onChange={(e) => setFormData({ ...formData, diff: e.target.value })}
                  required
                />
                <Input
                  label="Category (e.g. Winter Treks)"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Description</label>
                <textarea
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-rose-500 min-h-[100px]"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Inclusions (One per line)</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-rose-500 min-h-[100px]"
                    value={formData.inclusions}
                    onChange={(e) => setFormData({ ...formData, inclusions: e.target.value })}
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Exclusions (One per line)</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-rose-500 min-h-[100px]"
                    value={formData.exclusions}
                    onChange={(e) => setFormData({ ...formData, exclusions: e.target.value })}
                  ></textarea>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 mt-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-slate-900">Itinerary</h3>
                  <Button type="button" variant="outline" size="sm" onClick={() => setItinerary([...itinerary, { day: itinerary.length + 1, title: '', details: '' }])}>
                    <Plus className="w-4 h-4 mr-1" /> Add Day
                  </Button>
                </div>
                <div className="space-y-4">
                  {itinerary.map((day, index) => (
                    <div key={index} className="border border-slate-200 p-4 rounded-xl relative">
                      <button 
                        type="button" 
                        onClick={() => setItinerary(itinerary.filter((_, i) => i !== index))}
                        className="absolute top-2 right-2 text-slate-400 hover:text-rose-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="grid grid-cols-[80px_1fr] gap-4 mb-2">
                        <Input
                          label="Day"
                          type="number"
                          value={day.day.toString()}
                          onChange={(e) => {
                            const newItin = [...itinerary];
                            newItin[index].day = parseInt(e.target.value) || 0;
                            setItinerary(newItin);
                          }}
                          required
                        />
                        <Input
                          label="Title"
                          value={day.title}
                          onChange={(e) => {
                            const newItin = [...itinerary];
                            newItin[index].title = e.target.value;
                            setItinerary(newItin);
                          }}
                          required
                        />
                      </div>
                      <textarea
                        className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-rose-500"
                        placeholder="Day details..."
                        value={day.details}
                        onChange={(e) => {
                          const newItin = [...itinerary];
                          newItin[index].details = e.target.value;
                          setItinerary(newItin);
                        }}
                        required
                      ></textarea>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 mt-4">
                <h3 className="font-semibold mb-4 text-slate-900">Images</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Main Cover Image (Required for new)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setMainImage(e.target.files?.[0] || null)}
                      className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Gallery Image 1</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setGalleryImage1(e.target.files?.[0] || null)}
                      className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Gallery Image 2</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setGalleryImage2(e.target.files?.[0] || null)}
                      className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Gallery Image 3</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setGalleryImage3(e.target.files?.[0] || null)}
                      className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button type="submit" className="w-full" isLoading={submitting}>
                  {editingTrek ? 'Save Changes' : 'Create Trek'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
