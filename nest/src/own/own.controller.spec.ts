import { Test, TestingModule } from '@nestjs/testing';
import { OwnController } from './own.controller';

describe('OwnController', () => {
  let controller: OwnController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OwnController],
    }).compile();

    controller = module.get<OwnController>(OwnController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
