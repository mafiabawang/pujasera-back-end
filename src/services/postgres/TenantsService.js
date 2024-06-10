const { nanoid } = require('nanoid');

const DBUtils = require('../../utils/DBUtils');
const timeLocal = require('../../utils/TimeUtils');

const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

const tableNames = 'tenants';

class TenantsService {
    constructor() {
        this._dbUtils = new DBUtils();
    }

    async addTenant({ seller_id, place_id, name, about }) {
        const id = 'T_' + nanoid(14);
        const createdAt = timeLocal;
        const updatedAt = createdAt;

        const values = [id, seller_id, place_id, name, about, createdAt, updatedAt];
        const rows = await this._dbUtils.insert(tableNames, values);
        if (!rows[0].id) throw new InvariantError('Merchant gagal ditambahkan');

        return rows[0].id;
    }

    async getTenants(pId = '') {

        const column = ['tenants.id', 'users.username AS seller_name', 'places.name AS place_name', 'tenants.name AS tenant_name'];
        const joinTables = ['places', 'users'];
        const joinConditions = ['place_id', 'seller_id'];

        if (pId) {
            const rows = await this._dbUtils.select(column, tableNames, 'place_id = $1', [pId], joinTables, joinConditions);
            if (!rows.length) throw new NotFoundError('Place Tidak ditemukan');
            return rows;
        }

        return await this._dbUtils.select(column, tableNames, '', [], joinTables, joinConditions);
    }

    async getTenantById(id) {
        const rows = await this._dbUtils.select([], tableNames, 'id = $1', [id]);
        if (!rows.length) throw new NotFoundError('Merchant tidak ditemukan');
        return rows[0];
    }

    async editTenantById(id, { name, about }) {
        const updatedAt = timeLocal;

        const rows = await this._dbUtils.select(['name', 'about'], tableNames, `id = $1`, [id]);
        if (!rows.length) throw new NotFoundError('Gagal memperbarui informasi merchant. Id tidak ditemukan');

        if (rows[0].name === name && rows[0].about === about) throw new InvariantError('Gagal memperbarui informasi merchant. Tidak ada data yang diubah');

        const columns = ['name', 'about', 'updated_at'];
        const values = [name, about, updatedAt, id];
        await this._dbUtils.update(tableNames, columns, `id = $${values.length}`, values);
    }

    async editTenantSellerById(id, { old_seller_id, new_seller_id }) {
        const updatedAt = timeLocal;

        const checkOldSeller = await this._dbUtils.select(['seller_id'], tableNames, `id = $1`, [id]);
        if (!checkOldSeller.length) throw new NotFoundError('Gagal memperbarui seller merchant. Id tidak ditemukan');

        if (checkOldSeller[0].seller_id !== old_seller_id) throw new InvariantError('Gagal memperbarui seller merchant. Old Seller Tidak sama');

        const checkNewSeller = await this._dbUtils.select(['role'], 'users', `id = $1`, [new_seller_id]);
        if (!checkNewSeller.length) throw new NotFoundError('Gagal memperbarui seller merchant. Id New User Tidak Ditemukan');

        if (checkNewSeller[0].role !== 2) throw new InvariantError('Gagal memperbarui seller merchant. New User bukan seller');

        const columns = ['seller_id', 'updated_at'];
        const values = [new_seller_id, updatedAt, id];
        await this._dbUtils.update(tableNames, columns, `id = $${values.length}`, values);
    }

    async deleteTenantById(id) {
        const rows = await this._dbUtils.delete(tableNames, 'id = $1', [id]);
        if (!rows.length) throw new NotFoundError('Gagal menghapus Merchant. Id tidak ditemukan');
    }
}

module.exports = TenantsService;