import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    nav: {
      home: 'Home',
      add: 'Add New'
    },
    table: {
      no: 'No',
      name: 'Name',
      actions: 'Actions',
      edit: 'Edit',
      delete: 'Delete',
      add: 'Add New',
      search: 'Search',
      itemsPerPage: 'Items per page',
      page: 'Page',
      of: 'of'
    },
    detail: {
      title: 'Berry Detail',
      select: 'Select Berry',
      view: 'View',
      growth: 'Growth Time',
      harvest: 'Max Harvest',
      power: 'Natural Gift Power',
      size: 'Size',
      smoothness: 'Smoothness',
      dryness: 'Soil Dryness',
      firmness: 'Firmness',
      flavors: 'Flavors'
    },
    form: {
      title: 'Title',
      price: 'Price',
      description: 'Description',
      image: 'Image URL',
      category: 'Category',
      submit: 'Submit',
      cancel: 'Cancel',
      addTitle: 'Add New Product',
      editTitle: 'Edit Product',
      success: 'Success!',
      successAdd: 'Product added successfully',
      successEdit: 'Product updated successfully'
    }
  },
  id: {
    nav: {
      home: 'Beranda',
      add: 'Tambah Baru'
    },
    table: {
      no: 'No',
      name: 'Nama',
      actions: 'Aksi',
      edit: 'Ubah',
      delete: 'Hapus',
      add: 'Tambah Baru',
      search: 'Cari',
      itemsPerPage: 'Item per halaman',
      page: 'Halaman',
      of: 'dari'
    },
    detail: {
      title: 'Detail Berry',
      select: 'Pilih Berry',
      view: 'Lihat',
      growth: 'Waktu Tumbuh',
      harvest: 'Panen Maksimal',
      power: 'Kekuatan Hadiah Alami',
      size: 'Ukuran',
      smoothness: 'Kehalusan',
      dryness: 'Kekeringan Tanah',
      firmness: 'Kekerasan',
      flavors: 'Rasa'
    },
    form: {
      title: 'Judul',
      price: 'Harga',
      description: 'Deskripsi',
      image: 'URL Gambar',
      category: 'Kategori',
      submit: 'Kirim',
      cancel: 'Batal',
      addTitle: 'Tambah Produk Baru',
      editTitle: 'Ubah Produk',
      success: 'Berhasil!',
      successAdd: 'Produk berhasil ditambahkan',
      successEdit: 'Produk berhasil diperbarui'
    }
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
})