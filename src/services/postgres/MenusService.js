const { nanoid } = require('nanoid');

const DBUtils = require('../../utils/DBUtils');
const timeLocal = require('../../utils/TimeUtils');

const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

const tableNames = 'menus';

class MenusService {
    constructor() {
        this._dbUtils = new DBUtils();
    }

    async addMenu({ tenant_id, category_menu_id, name, description, price, qty }) {
        const id = 'M_' + nanoid(14);
        const createdAt = timeLocal;
        const updatedAt = createdAt;

        const values = [id, tenant_id, category_menu_id, name, description, price, qty, createdAt, updatedAt];
        const rows = await this._dbUtils.insert(tableNames, values);
        if (!rows[0].id) throw new InvariantError('Menu gagal ditambahkan');

        return rows[0].id;
    }

    async getMenus(tId = '', pId = '') {
        const column = ['menus.id', 'menus.name AS menu_name', 'price', 'qty'];
        const joinTables = ['tenants'];
        const joinConditions = ['tenant_id'];
        if (tId) {
            const rows = await this._dbUtils.select(['id', 'name', 'description', 'price', 'qty'], tableNames, 'tenant_id = $1', [tId]);
            if (!rows.length) throw new NotFoundError('Menu tidak ditemukan');
            return rows;
        }

        if (pId) return await this._dbUtils.select(column, tableNames, 'place_id = $1', [pId], joinTables, joinConditions);

        return await this._dbUtils.select(['id', 'name', 'description', 'price', 'qty'], tableNames);
    }

    async getMenuById(id) {
        const rows = await this._dbUtils.select([], tableNames, 'id = $1', [id]);
        if (!rows.length) throw new NotFoundError('Menu tidak ditemukan');
        return rows[0];
    }

    async editMenuById(id, { name, description, price, qty }) {
        const updatedAt = timeLocal;

        const rows = await this._dbUtils.select(['name', 'description', 'price', 'qty'], tableNames, `id = $1`, [id]);
        if (!rows.length) throw new NotFoundError('Gagal memperbarui Menu. Id tidak ditemukan');

        if (rows[0].name === name && rows[0].price === price && rows[0].description === description && rows[0].qty === qty) throw new InvariantError('Gagal memperbarui Menu. Tidak ada data yang diubah');

        const columns = ['name', 'description', 'price', 'qty', 'updated_at'];
        const values = [name, description, price, qty, updatedAt, id];
        await this._dbUtils.update(tableNames, columns, `id = $${values.length}`, values);
    }

    async deleteMenuById(id) {
        const rows = await this._dbUtils.delete(tableNames, 'id = $1', [id]);
        if (!rows.length) throw new NotFoundError('Gagal menghapus Menu. Id tidak ditemukan');
    }
}

module.exports = MenusService;