const { nanoid } = require('nanoid');

const { hashPassword, comparePassword } = require('../../utils/PasswordUtils');
const DBUtils = require('../../utils/DBUtils');
const timeLocal = require('../../utils/TimeUtils');

const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

const tableNames = 'users';

class UsersService {
    constructor() {
        this._dbUtils = new DBUtils();
    }

    async checkRoleSeller(id) {
        const rows = await this._dbUtils.select(['role'], tableNames, 'id = $1 AND role = 2', [id]);
        if (rows.length === 0) throw new InvariantError(`Anda tidak memiliki akses`);
    }

    async checkRoleOwner(id) {
        const rows = await this._dbUtils.select(['role'], tableNames, 'id = $1 AND role = 3', [id]);
        if (rows.length === 0) throw new InvariantError(`Anda tidak memiliki akses`);
    }

    async verifyUserCredential({ username, password }) {
        const rows = await this._dbUtils.select(['id', 'password'], tableNames, 'username = $1', [username]);
        if (!rows.length) throw new InvariantError('Kredensial yang Anda berikan salah');

        const { id, password: hashedPassword } = rows[0];
        const isMatching = await comparePassword(password, hashedPassword);
        if (!isMatching) throw new InvariantError('Kredensial yang Anda berikan salah');

        return id;
    }

    async verifyUniqueValue(value, column, action) {
        const rows = await this._dbUtils.select([column], tableNames, `${column} = $1`, [value]);
        if (rows.length > 0) throw new InvariantError(`Gagal ${action} ${column}. ${column} sudah digunakan.`);
    }


    async addUser({ username, email, password, role }) {
        await this.verifyUniqueValue(username, 'username', 'menambahkan');
        await this.verifyUniqueValue(email, 'email', 'menambahkan');

        const id = 'U_' + nanoid(14);
        const hashedPassword = await hashPassword(password);
        const createdAt = timeLocal;
        const updatedAt = createdAt;

        if (!(role >= 1 && role <= 4)) throw new InvariantError('Role tidak valid. Role harus diantara 1-4');

        const values = [id, username, email, hashedPassword, role, createdAt, updatedAt];
        const rows = await this._dbUtils.insert(tableNames, values);
        if (!rows[0].id) throw new InvariantError('User gagal ditambahkan');

        return rows[0].id;
    }

    async getUsers(role = '') {

        if (role) {
            if (!(role >= 1 && role <= 4)) throw new InvariantError('Role tidak valid. Role harus diantara 1-4');
            return this._dbUtils.select(['id', 'username'], tableNames, 'role = $1', [role]);
        }

        return this._dbUtils.select(['id', 'username', 'role'], tableNames);
    }

    async getUserById(id) {
        const rows = await this._dbUtils.select([], tableNames, 'id = $1', [id]);
        if (!rows.length) throw new NotFoundError(`User tidak ditemukan`);

        return rows[0];
    }

    async editUserById(id, { username, email }) {
        const updatedAt = timeLocal

        const rows = await this._dbUtils.select(['username', 'email'], tableNames, 'id = $1', [id]);
        if (!rows.length) throw new NotFoundError('Gagal memperbarui user. Id tidak ditemukan');

        if (username === rows[0].username && email === rows[0].email) throw new InvariantError('Gagal memperbarui user. Tidak ada data yang diubah');

        if (username !== rows[0].username) await this.verifyUniqueValue(username, 'username', 'merubah');
        if (email !== rows[0].email) await this.verifyUniqueValue(email, 'email', 'merubah');

        const columns = ['username', 'email', 'updated_at'];
        const values = [username, email, updatedAt, id];
        await this._dbUtils.update(tableNames, columns, `id = $${values.length}`, values);

    }

    async changePasswordById(id, { old_pass, new_pass, confirm_pass }) {
        const updatedAt = timeLocal;

        const rows = await this._dbUtils.select(['password'], tableNames, 'id = $1', [id]);
        if (!rows.length) throw new NotFoundError('Gagal memperbarui password. Id tidak ditemukan');

        const isMatching = await comparePassword(old_pass, rows[0].password);
        if (!isMatching) throw new InvariantError('Password anda salah');

        if (old_pass === new_pass) throw new InvariantError('Password baru tidak boleh sama dengan password lama');

        if (new_pass !== confirm_pass) throw new InvariantError('Password baru dan konfirmasi password tidak sama');
        const hashedPassword = await hashPassword(new_pass);

        const columns = ['password', 'updated_at'];
        const values = [hashedPassword, updatedAt, id];
        await this._dbUtils.update(tableNames, columns, `id = $${values.length}`, values);
    }

    async deleteUserById(id) {
        const rows = await this._dbUtils.delete(tableNames, 'id = $1', [id]);
        if (!rows.length) throw new NotFoundError('User gagal dihapus. Id tidak ditemukan');
    }
}

module.exports = UsersService;