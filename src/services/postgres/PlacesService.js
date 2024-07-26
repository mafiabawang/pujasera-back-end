const { nanoid } = require('nanoid');

const DBUtils = require('../../utils/DBUtils');
const timeLocal = require('../../utils/TimeUtils');

const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

const tableNames = 'places';

class PlacesService {
    constructor() {
        this._dbUtils = new DBUtils();
    }

    async addPlace({ name, lat, long, owner_id }) {
        const id = 'P_' + nanoid(14);
        const createdAt = timeLocal;
        const updatedAt = createdAt;

        const values = [id, owner_id, name, lat, long, createdAt, updatedAt];
        const rows = await this._dbUtils.insert(tableNames, values);
        if (!rows[0].id) throw new InvariantError('Pujasera gagal ditambahkan');

        return rows[0].id;
    }

    async getPlaces() {
        const columns = ['places.id', 'users.username AS owner_name', 'places.name AS place_name', 'lat', 'long'];
        return await this._dbUtils.select(columns, tableNames, '', [], ['users'], ['owner_id']);
    }

    async getPlaceById(id) {
        const rows = await this._dbUtils.select([], tableNames, 'id = $1', [id]);
        if (!rows.length) throw new NotFoundError('Pujasera tidak ditemukan');
        return rows[0];
    }

    async editPlaceById(id, { name, lat, long }) {
        const updatedAt = timeLocal;

        const rows = await this._dbUtils.select(['name', 'lat', 'long'], tableNames, `id = $1`, [id]);
        if (!rows.length) throw new NotFoundError('Gagal memperbarui informasi pujasera. Id tidak ditemukan');

        if (rows[0].name === name && rows[0].lat === lat && rows[0].long === long) throw new InvariantError('Gagal memperbarui informasi pujasera. Tidak ada data yang diubah');

        const columns = ['name', 'lat', 'long', 'updated_at'];
        const values = [name, lat, long, updatedAt, id];
        await this._dbUtils.update(tableNames, columns, `id = $${values.length}`, values);

    }

    async editOwnerPlaceById(id, { old_owner_id, new_owner_id }) {
        const updatedAt = timeLocal;

        const checkOldOwner = await this._dbUtils.select(['owner_id'], tableNames, `id = $1`, [id]);
        if (!checkOldOwner.length) throw new NotFoundError('Gagal memperbarui owner pujasera. Id tidak ditemukan');

        if (checkOldOwner[0].owner_id !== old_owner_id) throw new InvariantError('Gagal memperbarui owner pujasera. Old Owner Tidak sama');

        const checkNewOwner = await this._dbUtils.select(['role'], 'users', 'id = $1', [new_owner_id]);
        if (!checkNewOwner.length) throw new NotFoundError('Gagal memperbarui owner pujasera. Id New User Tidak Ditemukan');

        if (checkNewOwner[0].role !== 3) throw new InvariantError('Gagal memperbarui owner pujasera. New User Bukan Owner');

        const columns = ['owner_id', 'updated_at'];
        const values = [new_owner_id, updatedAt, id];
        await this._dbUtils.update(tableNames, columns, `id = $${values.length}`, values);
    }

    async deletePlaceById(id) {
        const rows = await this._dbUtils.delete(tableNames, 'id = $1', [id]);
        if (!rows.length) throw new NotFoundError('Gagal menghapus pujasera. Id tidak ditemukan');
    }
}

module.exports = PlacesService;