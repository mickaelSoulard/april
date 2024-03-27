<?php
declare(strict_types=1);
namespace Module\Inl_shippingcost\Form;

use PrestaShop\PrestaShop\Core\ConstraintValidator\Constraints\TypedRegex;
use PrestaShopBundle\Form\Admin\Type\FormattedTextareaType;
use PrestaShopBundle\Form\Admin\Type\TranslatableType;
use PrestaShopBundle\Form\Admin\Type\TranslatorAwareType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Length;
use PrestaShopBundle\Form\Admin\Type\CountryChoiceType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\MoneyType;
use Carrier;
// use Country;
use Context;

class CarrierRuleTextType extends TranslatorAwareType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
		$carriers = Carrier::getCarriers((int)Context::getContext()->language->id, true);
		$arrayCarriers = array();
		foreach($carriers as $carrier){
			$arrayCarriers[$carrier['name']] = $carrier['id_reference'];
		}
        $builder
			->add(
				'country',
				CountryChoiceType::class,
                [
                    'required' => true,
					'label' => 'Par Pays',
                    // 'attr' => ['placeholder' => 'YYYY-MM-DD'],
                    // 'data' => $now,
                    // 'empty_data' => $now,
                ]
			)
			->add('carriers', ChoiceType::class,
				 [
                    'required' => true,
					'label' => 'Par Transporteurs',
					'choices' => $arrayCarriers,
                    // 'attr' => ['placeholder' => 'YYYY-MM-DD'],
                    // 'data' => $now,
                    // 'empty_data' => $now,
                ]
			)
			->add('price_min', MoneyType::class, 
				[
					'label' => $this->trans('Prix Min', 'Modules.Inl_shippingcost.Admin'),
					'required' => true,
				]
			)
			->add('price_max', MoneyType::class, 
				[
					'label' => $this->trans('Prix Max', 'Modules.Inl_shippingcost.Admin'),
					'required' => true,
				]
			);
            // ->add('formatted_text_area_type', FormattedTextareaType::class, [
                // 'label' => $this->trans('Formatted text area type', 'Modules.Inl_shippingcost.Admin'),
            // ])
            // ->add('translatable_formatted_text_area_type', TranslatableType::class, [
                // 'label' => $this->trans('Translatable formatted text area type', 'Modules.Inl_shippingcost.Admin'),
                // 'help' => $this->trans('Throws error if length is > 30', 'Modules.Inl_shippingcost.Admin'),
                // 'type' => FormattedTextareaType::class,
                // 'required' => false,
                // 'options' => [
                    // 'constraints' => [
                        // new Length([
                            // 'max' => 130,
                        // ]),
                    // ],
                // ],
            // ]);
    }
}