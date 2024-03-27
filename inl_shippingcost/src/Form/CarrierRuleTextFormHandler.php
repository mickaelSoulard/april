<?php
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 */
declare(strict_types=1);

namespace Module\Inl_shippingcost\Form;

use Exception;
use PrestaShop\PrestaShop\Core\Hook\HookDispatcherInterface;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\OptionsResolver\Exception\UndefinedOptionsException;
use PrestaShop\PrestaShop\Core\Form\FormHandlerInterface;
use Doctrine\ORM\EntityManagerInterface;

class CarrierRuleTextFormHandler
{
    /**
     * @var string
     */
    public $form;

    /**
     * @var FormFactoryInterface the form factory
     */
    protected $formFactory;

    /**
     * @var FormDataProviderInterface the form data provider
     */
    protected $formDataProvider;
	
	private $entityManager;

    /**
     * @var HookDispatcherInterface the event dispatcher
     */
    protected $hookDispatcher;

    /**
     * @var string the hook name
     */
    protected $hookName;

    /**
     * @var string the form name
     */
    protected $formName;

    /**
     * FormHandler constructor.
     *
     * @param FormFactoryInterface $formFactory
     * @param HookDispatcherInterface $hookDispatcher
     * @param FormDataProviderInterface $formDataProvider
     * @param string $form
     * @param string $hookName
     * @param string $formName
     */
    public function __construct(
        FormFactoryInterface $formFactory,
        HookDispatcherInterface $hookDispatcher,
        $formDataProvider,
        string $form,
        $hookName,
        $formName = 'form'
    ) {
        $this->formFactory = $formFactory;
        $this->hookDispatcher = $hookDispatcher;
        $this->formDataProvider = $formDataProvider;
        $this->form = $form;
        $this->hookName = $hookName;
        $this->formName = $formName;
    }

    public function getFormCarrierRule($carrier)
    {
        $formBuilder = $this->formFactory->createNamedBuilder($this->formName, $this->form);
        $return = [];
		$return['country'] = $carrier['id_country'];
		$return['carriers'] = $carrier['id_carrier'];
		$return['price_min'] = $carrier['price'];
		$return['price_max'] = $carrier['price_max'];
		$formBuilder->setData($return);

        $this->hookDispatcher->dispatchWithParameters(
            "action{$this->hookName}Form",
            [
                'form_builder' => $formBuilder,
            ]
        );

        return $formBuilder->getForm();
    }
	
	public function update($carrierRule, $carrier, $entityManager)
    {
		// $entityManager  = $this->get('doctrine.orm.entity_manager');
		$carrierRule
				->setCarrierId((int)$carrier["carriers"])
				->setIdReference((int)$carrier["carriers"])
				->setIdCountry((int)$carrier["country"])
				->setPrice(floatval($carrier["price_min"]))
				->setPriceMax(floatval($carrier["price_max"]))
			;
			
			//This call adds the entity to the EntityManager scope (now it knows the entity exists)
			$entityManager->persist($carrierRule);

			//This call validates all previous modification (modified/persisted entities)
			//This is when the database queries are performed
			$entityManager->flush();
			
		return [];
    }
}
