const { nanoid } = require('nanoid');

const DBUtils = require('../../utils/DBUtils');
const timeLocal = require('../../utils/TimeUtils');

const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

const tableNames = 'categories_menu';

class CategoriesMenusService {
    constructor() {
        this._dbUtils = new DBUtils();
    }

    async addCategoryMenu({ tenant_id, name }) {
        const id = 'CM_' + nanoid(13);
        const createdAt = timeLocal;
        const updatedAt = createdAt;

        const values = [id, tenant_id, name, createdAt, updatedAt];
        const rows = await this._dbUtils.insert(tableNames, values);
        if (!rows[0].id) throw new InvariantError('Kategori Menu gagal ditambahkan');

        return rows[0].id;
    }

    async getCategoriesMenus(tId = '') {
        if (tId) {
            const rows = await this._dbUtils.select(['id', 'name'], tableNames, 'tenant_id = $1', [tId]);
            if (!rows.length) throw new NotFoundError('Kategori Menu tidak ditemukan');
            return rows;
        }
        return await this._dbUtils.select(['id', 'name'], tableNames);
    }

    async getCategoryMenuById(id) {
        const rows = await this._dbUtils.select([], tableNames, 'id = $1', [id]);
        if (!rows.length) throw new NotFoundError('Kategori Menu tidak ditemukan');
        return rows[0];
    }

    async editCategoryMenuById(id, { name }) {
        const updatedAt = timeLocal;

        const rows = await this._dbUtils.select(['name'], tableNames, `id = $1`, [id]);
        if (!rows.length) throw new NotFoundError('Gagal memperbarui kategori Menu. Id tidak ditemukan');

        if (rows[0].name === name) throw new InvariantError('Gagal memperbarui kategori Menu. Tidak ada data yang diubah');

        const columns = ['name', 'updated_at'];
        const values = [name, updatedAt, id];
        await this._dbUtils.update(tableNames, columns, `id = $${values.length}`, values);
    }

    async deleteCategoryMenuById(id) {
        const rows = await this._dbUtils.delete(tableNames, 'id = $1', [id]);
        if (!rows.length) throw new NotFoundError('Gagal menghapus kategori Menu. Id tidak ditemukan');
    }
}

module.exports = CategoriesMenusService;