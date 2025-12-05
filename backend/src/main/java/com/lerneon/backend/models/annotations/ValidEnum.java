package com.lerneon.backend.models.annotations;

import com.lerneon.backend.handlers.ValidEnumValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = ValidEnumValidator.class)
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface ValidEnum {
    String message() default "must be any of enum {enumClass}";

    Class<? extends Enum> enumClass() default Enum.class;

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}