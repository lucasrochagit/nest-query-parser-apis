import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';

export type JobDTO = CreateJobDTO & UpdateJobDTO;

export class CreateJobDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Matches(/^([A-ZÀ-Üa-zà-ü0-9]+\s?)*(?<! )$/, {
    message: 'title should contains letters, numbers and space between words',
  })
  title: string;

  @IsDefined()
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 })
  @Min(1000)
  @Max(10000)
  salary: number;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Matches(/^([A-ZÀ-Üa-zà-ü]+\s?)*(?<! )$/, {
    message: 'enterprise should contains letters and space between words',
  })
  enterprise: string;
}

export class UpdateJobDTO {
  @ValidateIf((dto) => dto.title !== undefined)
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Matches(/^([A-ZÀ-Üa-zà-ü0-9]+\s?)*(?<! )$/, {
    message: 'title should contains letters, numbers and space between words',
  })
  title: string;

  @ValidateIf((dto) => dto.salary !== undefined)
  @IsDefined()
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 })
  @Min(1000)
  @Max(10000)
  salary: number;

  @ValidateIf((dto) => dto.enterprise !== undefined)
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Matches(/^([A-ZÀ-Üa-zà-ü]+\s?)*(?<! )$/, {
    message: 'enterprise should contains letters and space between words',
  })
  enterprise: string;
}
