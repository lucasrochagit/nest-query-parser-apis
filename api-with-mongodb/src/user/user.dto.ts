import {
  IsArray,
  IsDefined,
  IsEmail,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Matches,
  Max,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export type UserDTO = CreateUserDTO & UpdateUserDTO;

export class AddressDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Matches(/^([A-ZÀ-Üa-zà-ü0-9]+\s?)*(?<! )$/, {
    message: 'street should contains letters, numbers and space between words',
  })
  street: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Matches(/^([A-ZÀ-Üa-zà-ü0-9]+\s?)*(?<! )$/, {
    message: 'city should contains letters, numbers and space between words',
  })
  city: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Matches(/^([A-ZÀ-Üa-zà-ü0-9]+\s?)*(?<! )$/, {
    message: 'state should contains letters, numbers and space between words',
  })
  state: string;
}

export class CreateUserDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Matches(/^([A-ZÀ-Üa-zà-ü0-9]+\s?)*(?<! )$/, {
    message: 'name should contains letters, numbers and space between words',
  })
  name: string;

  @IsDefined()
  @IsInt()
  @Min(18)
  @Max(80)
  age: number;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Matches(/^([A-ZÀ-Üa-zà-ü]+\s?)*(?<! )$/, {
    message: 'gender should contains letters and space between words',
  })
  gender: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @Matches(/^([A-ZÀ-Üa-zà-ü0-9\-+]+\s?)*(?<! )$/, {
    each: true,
    message:
      'skills should contains letters, space between words, hyphen and plus symbol',
  })
  skills: string[];

  @ValidateNested()
  address: AddressDTO;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  current_job: string;

  @ValidateIf((dto) => dto.jobs !== undefined)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsMongoId({ each: true })
  jobs: string[];
}

export class UpdateUserDTO {
  @ValidateIf((dto) => dto.name !== undefined)
  @IsString()
  @IsNotEmpty()
  @Matches(/^([A-ZÀ-Üa-zà-ü0-9]+\s?)*(?<! )$/, {
    message: 'name should contains letters, numbers and space between words',
  })
  name: string;

  @ValidateIf((dto) => dto.age !== undefined)
  @IsInt()
  @Min(18)
  @Max(80)
  age: number;

  @ValidateIf((dto) => dto.gender !== undefined)
  @IsString()
  @IsNotEmpty()
  @Matches(/^([A-ZÀ-Üa-zà-ü]+\s?)*(?<! )$/, {
    message: 'gender should contains letters and space between words',
  })
  gender: string;

  @ValidateIf((dto) => dto.email !== undefined)
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ValidateIf((dto) => dto.skills !== undefined)
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @Matches(/^([A-ZÀ-Üa-zà-ü0-9\-+]+\s?)*(?<! )$/, {
    each: true,
    message:
      'skills should contains letters, space between words, hyphen and plus symbol',
  })
  skills: string[];

  @ValidateIf((dto) => dto.address !== undefined)
  @ValidateNested()
  address: AddressDTO;

  @ValidateIf((dto) => dto.current_job !== undefined)
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  current_job: string;

  @ValidateIf((dto) => dto.jobs !== undefined)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsMongoId({ each: true })
  jobs: string[];
}
