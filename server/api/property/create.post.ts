import prisma from "~~/lib/prisma";
import { propertyCreateSchema } from "~/schemas/property";
import { requireAuth } from "../middleware/auth";
import { medias, amenityValues } from "~/constants/taxonomies";

export default requireAuth(
  defineEventHandler(async (event) => {
    const body = await readBody(event);
    const userId = event.context.user.id;

    const validation = propertyCreateSchema.safeParse(body);

    if (!validation.success) {
      throw createError({
        statusCode: 400,
        statusMessage: "api.login.validationFailed",
      });
    }

    try {
      const {
        city,
        district,
        street,
        buildingNumber,
        parentId,
        subPropertyIds,
      } = body;

      if (!parentId && (city || street || buildingNumber)) {
        const geo = await geocodeAddress({
          city,
          district,
          street,
          buildingNumber,
        });
        if (geo) {
          body.latitude = geo.lat;
          body.longitude = geo.lon;
        }
      }

      const allowedFields = [
        "title",
        "description",
        "type",
        "listingType",
        "price",
        "deposit",
        "city",
        "district",
        "street",
        "buildingNumber",
        "latitude",
        "longitude",
        "sizeM2",
        "rooms",
        "floor",
        "yearBuilt",
        "isShared",
        "images",
        "roomType",
        "email",
        "phone",
        "mainImageIdx",
        ...amenityValues,
        ...medias,
      ];

      const createData: Record<string, any> = Object.fromEntries(
        Object.entries(body).filter(
          ([key, value]) => allowedFields.includes(key) && value !== undefined,
        ),
      );

      const property = await prisma.property.create({
        data: {
          ...createData,
          status: body.status || "ACTIVE",
          owner: { connect: { id: userId } },
          parent: parentId ? { connect: { id: parentId } } : undefined,
          subProperties:
            subPropertyIds && Array.isArray(subPropertyIds)
              ? { connect: subPropertyIds.map((id: string) => ({ id })) }
              : undefined,
        },
      });

      return { success: true, property };
    } catch (error) {
      console.error("Error creating property", error);
      throw createError({
        statusCode: 500,
        statusMessage: "There was an error creating the property",
      });
    }
  }),
);
