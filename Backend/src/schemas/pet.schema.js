import { z } from 'zod';

// Esquema para crear una nueva mascota
/**
 * @swagger
 * components:
 *   schemas:
 *     CreatePet:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - age
 *         - owner
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre de la mascota
 *         type:
 *           type: string
 *           enum: [dog, cat, bird, other]
 *           description: Tipo de mascota
 *         breed:
 *           type: string
 *           description: Raza de la mascota
 *         age:
 *           type: integer
 *           description: Edad de la mascota
 *         owner:
 *           type: string
 *           description: ID del dueño
 *     UpdatePet:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre de la mascota
 *         type:
 *           type: string
 *           enum: [dog, cat, bird, other]
 *           description: Tipo de mascota
 *         breed:
 *           type: string
 *           description: Raza de la mascota
 *         age:
 *           type: integer
 *           description: Edad de la mascota
 *         owner:
 *           type: string
 *           description: ID del dueño
 *     CreateBooking:
 *       type: object
 *       required:
 *         - bookingType
 *         - pet
 *         - date
 *         - owner
 *       properties:
 *         bookingType:
 *           type: string
 *           enum: [walking, daycare, grooming]
 *           description: Tipo de servicio reservado
 *         pet:
 *           type: string
 *           description: ID de la mascota
 *         caregiver:
 *           type: string
 *           description: ID del cuidador (opcional)
 *         owner:
 *           type: string
 *           description: ID del dueño
 *         date:
 *           type: string
 *           format: date-time
 *           description: Fecha de la reserva
 *         status:
 *           type: string
 *           enum: [pending, completed, canceled]
 *           description: Estado de la reserva
 */

export const createPetSchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio').trim(),
    type: z.enum(['dog', 'cat', 'bird', 'other']),
    breed: z.string().optional().transform(value => value.trim()),
    age: z.number().int().nonnegative('La edad debe ser un número positivo'),
    owner: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID de propietario inválido')
});

// Esquema para actualizar una mascota existente
export const updatePetSchema = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID de mascota inválido'),
    body: z.object({
        name: z.string().min(1, 'El nombre es obligatorio').trim().optional(),
        type: z.enum(['dog', 'cat', 'bird', 'other']).optional(),
        breed: z.string().optional().transform(value => value.trim()),
        age: z.number().int().nonnegative('La edad debe ser un número positivo').optional(),
        owner: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID de propietario inválido').optional()
    })
});

// Esquema para eliminar una mascota
export const deletePetSchema = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID de mascota inválido')
});

// Esquema para obtener una mascota por ID
export const getPetSchema = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID de mascota inválido')
});