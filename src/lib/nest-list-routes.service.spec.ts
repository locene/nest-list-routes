import { Test, TestingModule } from '@nestjs/testing';
import { NestListRoutesService } from './nest-list-routes.service';

describe('NestListRoutesService', () => {
    let service: NestListRoutesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [NestListRoutesService],
        }).compile();

        service = module.get<NestListRoutesService>(NestListRoutesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
