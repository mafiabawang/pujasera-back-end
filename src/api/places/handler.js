const autoBind = require('auto-bind');

class PlacesHandler {
    constructor(placesService, usersService, validator) {
        this._placesService = placesService;
        this._usersService = usersService;
        this._validator = validator;

        autoBind(this);
    }

    async postPlaceHandler(request, h) {
        this._validator.validatePlaceCreatePayload(request.payload);
        const { name, lat, long, owner_id } = request.payload;

        const owner = await this._usersService.getUserById(owner_id);
        await this._usersService.checkRoleOwner(owner.id);

        const PlaceId = await this._placesService.addPlace({ name, lat, long, owner_id: owner.id });

        const response = h.response({
            status: 'success',
            message: 'Pujasera berhasil ditambahkan',
            data: {
                PlaceId
            }
        });
        response.code(201);
        return response;
    }

    async getPlacesHandler(request) {
        const { pId } = request.query;
        const places = await this._placesService.getPlaces(pId);

        return {
            status: 'success',
            data: {
                places
            }
        };
    }

    async getPlaceByIdHandler(request) {
        const { id } = request.params;
        const place = await this._placesService.getPlaceById(id);

        return {
            status: 'success',
            data: {
                place
            }
        };
    }

    async putPlaceByIdHandler(request) {
        this._validator.validatePlaceUpdatePayload(request.payload);
        const { name, lat, long } = request.payload;
        const { id } = request.params;

        await this._placesService.editPlaceById(id, { name, lat, long });

        return {
            status: 'success',
            message: 'Informasi Pujasera berhasil diperbarui'
        };
    }

    async putPlaceOwnerByIdHandler(request) {
        const { id } = request.params;
        this._validator.validateOwnerPlaceUpdatePayload(request.payload);
        const { old_owner_id, new_owner_id } = request.payload;

        await this._placesService.editOwnerPlaceById(id, { old_owner_id, new_owner_id });

        return {
            status: 'success',
            message: 'Owner Pujasera berhasil diperbarui'
        };
    }

    async deletePlaceByIdHandler(request) {
        const { id } = request.params;
        await this._placesService.deletePlaceById(id);

        return {
            status: 'success',
            message: 'Pujasera berhasil dihapus'
        };
    }
}

module.exports = PlacesHandler;