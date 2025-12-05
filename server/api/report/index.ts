import prisma from "~~/lib/prisma";
import { requireAuth } from "../middleware/auth";

export default requireAuth(
  defineEventHandler(async (event) => {
    const reporterId = event.context.user.id;

    const body = await readBody(event);
    const { entityId, reason, description, entity } = body;

    if (!reason) {
      throw createError({
        statusCode: 400,
        statusMessage: "api.report.reasonRequired",
      });
    }

    if (!entityId) {
      throw createError({
        statusCode: 400,
        statusMessage: "api.report.noTargetProvided",
      });
    }

    try {
      const report = await prisma.report.create({
        data: {
          reason,
          description: description ?? null,
          reporterId,
          reportedUserId: entity === "user" ? entityId : null,
          reportedPropertyId: entity === "property" ? entityId : null,
        },
      });

      return {
        success: true,
        message: "api.report.submitted",
        reportId: report.id,
      };
    } catch (error) {
      console.error("Report create error:", error);
      throw createError({
        statusCode: 500,
        statusMessage: "api.report.failed",
      });
    }
  })
);
