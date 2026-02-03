import { OrganizationsRepository } from "../repositories/organizations-repository";
import { Organization } from "../generated/prisma";
import { resourceNotFoundError } from "./errors/resource-not-foud-error";

interface GetOrganizationProfileUseCaseRequest {
    organizationId: string
}

interface GetOrganizationProfileUseCaseResponse {
    organization: Organization
}

export class GetOrganizationProfileUseCase {
    constructor(
        private organizationRepository: OrganizationsRepository,
    ) { }

    async execute({ organizationId }: GetOrganizationProfileUseCaseRequest): Promise<GetOrganizationProfileUseCaseResponse> {

        const organization = await this.organizationRepository.findById(organizationId)

        if (!organization) {
            throw new resourceNotFoundError()
        }

        return { organization }
    }
}