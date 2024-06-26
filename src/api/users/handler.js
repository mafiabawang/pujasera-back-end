const autoBind = require('auto-bind');

class UsersHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        autoBind(this);
    }

    async postUserHandler(request, h) {
        this._validator.validateUserCreatePayload(request.payload);
        const { username, email, password, role } = request.payload;
        const userId = await this._service.addUser({ username, email, password, role });

        const response = h.response({
            status: 'success',
            message: 'User berhasil ditambahkan',
            data: {
                userId
            }
        });
        response.code(201);
        return response;
    }

    async getUsersHandler(request) {
        const { role } = request.query;
        const users = await this._service.getUsers(role);

        return {
            status: 'success',
            data: {
                users
            }
        };
    }

    async getUserByIdHandler(request) {
        const { id } = request.params;
        const user = await this._service.getUserById(id);

        return {
            status: 'success',
            data: {
                user
            }
        };
    }

    async putUserByIdHandler(request) {
        this._validator.validateUserUpdatePayload(request.payload);
        const { username, email } = request.payload;
        const { id } = request.params;
        await this._service.editUserById(id, { username, email });

        return {
            status: 'success',
            message: 'User berhasil diperbarui'
        };
    }

    async changePasswordByIdHandler(request) {
        this._validator.validatePasswordUpdatePayload(request.payload);
        const { old_pass, new_pass, confirm_pass } = request.payload;
        const { id } = request.params;

        await this._service.changePasswordById(id, { old_pass, new_pass, confirm_pass });

        return {
            status: 'success',
            message: 'Password berhasil diperbarui'
        };
    }

    async deleteUserByIdHandler(request) {
        const { id } = request.params;
        await this._service.deleteUserById(id);

        return {
            status: 'success',
            message: 'User berhasil dihapus'
        };
    }
}

module.exports = UsersHandler;